import { Router, Request, Response } from "express";
import { sequelize } from "../database/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const withoutAuth = Router();


type RequestBodyLogin = {
  email: string;
  password: string;
}

type UserLoginData = [
  {
    name: string;
    email: string;
    password: string;
  }
]


withoutAuth.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password }: RequestBodyLogin = request.body;

    const [user]: UserLoginData[] | any = await sequelize.query(`
      SELECT * FROM users WHERE "email" = '${email}'
    `);

    if (user.length == 0) 
      return response.json({ success: false, message: "Não existe nenhuma conta com este email." })
    
    const match = await bcrypt.compare(password, user[0].password);

    if (match) {
      console.log("Coloquei esse id: ", user[0].id)
      const token = jwt.sign(
        { userId: user[0].id }, 
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: "730d" }
      );

      return response.json({ 
        success: true, 
        message: "Tudo certo, conectado!", 
        token 
      });

    } else
      return response.json({ success: false, message: "Senha incorreta" });
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao entrar." });
  }
});

type RequestBodyRegister = {
  name: string;
  email: string;
  password: string;
  password2: string;
}

withoutAuth.post("/register", async (request: Request, response: Response) => {
  try {
    const { name, email, password, password2 }: RequestBodyRegister = request.body;
    console.log("dados: ", request.body)
    if (name.length <= 2 || email.indexOf("@") === -1 || password.length < 6 || password !== password2) {
      return response.json({ success: false, message: "Dados inválidos." });
    } else {

      var [result] = await sequelize.query(`
        SELECT * FROM users
        WHERE email = '${email}'
      `);

      if (result.length === 0) {
        
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao tentar cadastrar usuário." });

          await sequelize.query(`
            INSERT INTO users (name, email, password)
            VALUES
            ('${name}', '${email}', '${hash}')
          `);

          return response.json({ success: true, message: "Usuário cadastrado com sucesso!" })

        });

      } else {
        return response.json({ success: false, message: "Esse email já está sendo usado." });
      }
    }
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao tentar cadastrar usuário." });
  }
});


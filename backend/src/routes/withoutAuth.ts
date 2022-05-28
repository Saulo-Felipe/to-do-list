import { Router, Request, Response } from "express";
import { sequelize } from "../database/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const withoutAuth = Router();


type RequestBodyLogin = {
  email: string;
  password: string;
}

type UserLoginData = [{
  name: string;
  email: string;
  password: string;
}]

type RequestBodyRegister = {
  name: string;
  email: string;
  password: string;
  password2: string;
}

type oAuthBodyRequest = {
  email: string;
  name: string;
}

withoutAuth.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password }: RequestBodyLogin = request.body;

    const [user]: UserLoginData[] | any = await sequelize.query(`
      SELECT * FROM "User" WHERE email = '${email}'
    `);

    if (user.length == 0) 
      return response.json({ success: false, message: "Não existe nenhuma conta com este email." })
    
    const match = await bcrypt.compare(password, user[0].password);

    if (match) {
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


withoutAuth.post("/register", async (request: Request, response: Response) => {
  try {
    const { name, email, password, password2 }: RequestBodyRegister = request.body;

    console.log("registro dados: ", request.body);

    if (name.length <= 2 || email.indexOf("@") === -1 || password.length < 6 || password !== password2) {
      return response.json({ success: false, message: "Dados inválidos." });
    } else {

      var [result] = await sequelize.query(`
        SELECT * FROM "User"
        WHERE email = '${email}'
      `);

      if (result.length === 0) {
        
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao tentar cadastrar usuário." });

          await sequelize.query(`
            INSERT INTO "User" (name, email, password)
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

withoutAuth.post("/authenticate-oAuth", async (request: Request, response: Response) => {
  try {
    const { email, name }: oAuthBodyRequest = request.body;
    let token: string;

    const [user]: UserLoginData[] | any = await sequelize.query(`
      SELECT id FROM "User" WHERE email = '${email}'
    `);

    if (user.length == 0) { // Registro
      await sequelize.query(`
        INSERT INTO "User" (name, email, password)
        VALUES
        ('${name}', '${email}', ' ')
      `);
      
      const [user2]: UserLoginData[] | any = await sequelize.query(`
        SELECT id FROM "User" WHERE email = '${email}'
      `);

      token = jwt.sign(
        { userId: user2[0].id }, 
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: "730d" }
      );
    } 
    else
      token = jwt.sign(
        { userId: user[0].id }, 
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: "730d" }
      );

    return response.json({ success: true, message: "Tudo certo, conectado!", token });
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao entrar." });
  }
});

import express, { Request, Response } from "express";
import { sequelize } from "../database/database";
import bcrypt from "bcrypt";

export const client = express.Router()


client.post("/login", (request: Request, response: Response) => {



  return response.status(200).json({ Ok: true });
})

type RequestBodyRegister = {
  name: string;
  email: string;
  password: string;
  password2: string;
}

client.post("/register", async (request: Request, response: Response) => {
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
})


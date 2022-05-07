import { Router, Request, Response } from "express";
import { sequelize } from "../database/database";
import { MiddlewareAuthentication } from "../MiddlewareAuthentication";
import jwt from "jsonwebtoken";

export const withAuth = Router();

withAuth.use(MiddlewareAuthentication);


withAuth.post("/get-user", async (request: Request, response: Response) => {
  try {
    const currentUserId = request.headers.currentUserId;
  
    const [user]: any = await sequelize.query(`
      SELECT name FROM "User" 
      WHERE id = ${Number(currentUserId)}
    `);
  
    return response.json({ name: user[0].name })
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao carregar dados." });
  }
});

type CreateCategoryBody = {
  categoryID: string;
  emojiID: string;
  content: string;
  bgColor: string;
  textColor: string;
}

withAuth.post("/create-category", async (request: Request, response: Response) => {
  try {
    const { bgColor, content, emojiID, textColor }: CreateCategoryBody = request.body;
    const userID = request.headers.currentUserId;

    await sequelize.query(`
      INSERT INTO "Categories" (name, "backgroundColor", "contentColor", "iconId", "PkUserId")
      VALUES
      ('${content}', '${bgColor}', '${textColor}', '${emojiID}', ${userID})
    `);

    return response.json({ success: true, message: `Categoria "${content}" criada com sucesso!` })    
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao criar categoria." });
  }
});

withAuth.post("/get-categories", async(request: Request, response: Response) => {
  try {
    const userId = request.headers.currentUserId;

    const [categories] = await sequelize.query(`
      SELECT * FROM "Categories" 
      WHERE "PkUserId" = ${userId}
    `);

    return response.json({
      success: true,
      error: false,
      message: "Categorias atualizadas.",
      categories: [ ...categories ]
    });
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao atualizar categorias." });
  }
});
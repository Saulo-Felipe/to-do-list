import { Router, Request, Response } from "express";
import { sequelize } from "../database/database";
import { MiddlewareAuthentication } from "../MiddlewareAuthentication";
import jwt from "jsonwebtoken";

export const withAuth = Router();

withAuth.use(MiddlewareAuthentication);

type CreateCategoryBody = {
  categoryID: string;
  emojiID: string;
  content: string;
  bgColor: string;
  textColor: string;
}


withAuth.post("/get-user", async (request: Request, response: Response) => {
  try {
    const currentUserId = request.headers.currentUserId;

    if (!currentUserId)
      throw "Erro de validação";
  
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

withAuth.post("/create-category", async (request: Request, response: Response) => {
  try {
    const { bgColor, content, emojiID, textColor }: CreateCategoryBody = request.body;
    const userID = request.headers.currentUserId;

    if (!bgColor || !content || !emojiID || !textColor || !userID)
      throw "Erro de validação";

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

    if (!userId)
      throw "Erro de validação";


    const [categories] = await sequelize.query(`
      SELECT * FROM "Categories" 
      WHERE "PkUserId" = ${userId}
      ORDER BY id DESC
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

withAuth.post("/get-category", async (request: Request, response: Response) => {
  try {
    const { categoryID } = request.body;
    const currentUserId = request.headers.currentUserId;

    if (!categoryID)
      throw "Erro de validação"
    
    let [result] = await sequelize.query(`
      SELECT * FROM "Categories"
      WHERE id = ${ categoryID }
      AND "PkUserId" = ${ currentUserId }
    `);

    if (result.length === 0)
      return response.json({ success: false, error: true, message: "Categoria inválida" });
    
    return response.json({ success: true, category: result[0], message: "Tasks carregadas!" });

  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao Carregar tasks." });
  }
});

withAuth.post("/delete-category", async (request: Request, response: Response) => {
  try {
    const { categoryId } = request.body;

    await sequelize.query(`
      DELETE FROM "Categories" 
      WHERE id = ${categoryId}
    `);

    return response.json({ success: true, error: false, message: "Categoria removida com sucesso!" });
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao deletar categoria." });
  }
});

withAuth.post("/get-tasks", async (request: Request, response: Response) => {
  try {
    const { categoryID } = request.body;

    const [result] = await sequelize.query(`
      SELECT * FROM "Tasks"
      WHERE "categoryID" = ${ categoryID }
    `);

    return response.json({ success: true, error: false, message: "Tasks carregadas com sucesso!", tasks: result });
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao carregar tasks." });
  }
});

withAuth.post("/create-task", async (request: Request, response: Response) => {
  try {
    const { content, categoryID } = request.body;

    await sequelize.query(`
      INSERT INTO "Tasks" (content, finished, "categoryID")
      VALUES ('${content}', ${false}, ${categoryID})
    `);

    return response.json({ success: true, error: false, message: "Task criada com sucesso!" });
  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao Carregar categoria." });
  }
});

withAuth.post("/delete-task", async (request: Request, response: Response) => {
  try {

    const { taskId } = request.body;

    await sequelize.query(`
      DELETE FROM 
    `);


  }
  catch(e) {
    console.warn("Erro interno!: ", e);
    return response.json({ success: false, error: true, message: "Ocorreu um erro desconhecido ao Carregar categoria." });
  }
});
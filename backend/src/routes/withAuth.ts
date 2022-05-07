import { Router, Request, Response } from "express";
import { sequelize } from "../database/database";
import { MiddlewareAuthentication } from "../MiddlewareAuthentication";
import jwt from "jsonwebtoken";

export const withAuth = Router();

withAuth.use(MiddlewareAuthentication);


withAuth.post("/get-user", async (request: Request, response: Response) => {
  const currentUserId = request.headers.currentUserId;

  const [user]: any = await sequelize.query(`
    SELECT name FROM users 
    WHERE id = ${Number(currentUserId)}
  `);

  return response.json({ name: user[0].name })
});
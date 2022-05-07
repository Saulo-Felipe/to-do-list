import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function MiddlewareAuthentication(request: Request, response: Response, next: NextFunction) {
  const token: any = request.headers.token;

  if (token && token.length > 0)
    jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (err, decoded) => {
      if (err)
        return response.json({ invalidToken: true });
        
      else {
        request.headers.currentUserId = decoded.userId;
        next();
      }
    });

  else
    return response.json({ invalidToken: true });
}
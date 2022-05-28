import express, { Express, Request, Response } from "express";
import { withoutAuth } from "./src/routes/withoutAuth";
import cors from "cors";
import { MiddlewareAuthentication } from "./src/MiddlewareAuthentication";

const app: Express = express();

import "dotenv/config";
import { withAuth } from "./src/routes/withAuth";

// Middlwares
app.use(cors({
  origin: process.env.CLIENT_URL
}));


app.use(express.json())

app.get("/", (request: Request, response: Response) => {
  response.send("Hello, world!");
});

app.use("/", withoutAuth);
app.use("/", withAuth);

app.listen(process.env.PORT || 8081, () => {
    console.clear(); 
    console.log("Server is running on port 8081");
  }
);
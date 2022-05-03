import express, { Express, Request, Response } from "express";
import { client } from "./src/routes/cliente";
import cors from "cors";

const app: Express = express();

// Middlwares
app.use(cors({
  origin: "https://3000-saulofelipe-todolist-mubykx0n5jn.ws-us43.gitpod.io"
}));

app.use(express.json())

app.get("/", (request: Request, response: Response) => {
  response.send("Hello, world!");
});

app.use("/", client);

app.listen(8081, () => console.log("Server is running on port 8081"));
import express, { Express, Request, Response } from "express";
import { withoutAuth } from "./src/routes/withoutAuth";
import cors from "cors";

const app: Express = express();

import "dotenv/config";
import { withAuth } from "./src/routes/withAuth";

// Middlwares
app.use(cors({
  origin: "*"
}));


app.use(express.json())

app.get("/", (request: Request, response: Response) => {
  console.log(process.env)
  response.send("Hello, world!");
});

app.use("/", withoutAuth);
app.use("/", withAuth);

app.listen(process.env.PORT || 3003, () => {
    console.clear(); 
    console.log("Server is running on port 3003");
  }
);
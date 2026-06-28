import "dotenv/config";
import express from "express";

const app = express();

import analyzeRouter from "./routes/analyze.routes.js";
import { createConnection } from "./config/db.js";

app.use(express.json());

const PORT = process.env.PORT;

app.use("/analyze", analyzeRouter);

app.listen(PORT || 3000, async () => {
  createConnection();
  console.log(`server is running on port:${PORT}`);
});

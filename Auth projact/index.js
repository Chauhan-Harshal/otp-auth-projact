import express from "express";
import { router } from "./src/routes/routes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

export const app = express();

app.use(express.json({ limit: "15kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
}));

app.use("/", router);
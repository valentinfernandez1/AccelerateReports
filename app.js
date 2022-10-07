import express from "express";
import logger from "morgan";
import Cors from "cors";
import dotenv from "dotenv";
import reportController from "./src/Controllers/reportController.js";
import reportRouter from "./src/Routes/reportRoute.js";

const app = express();

dotenv.config();

//Settings
const port = process.env.PORT;
app.set("port", port);

// Middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(Cors());

//Routes
app.get("/", (req, res) => res.sendStatus(200));
app.use("/api/report", reportRouter);

//UtilityRoutes
app.get("/health", (req, res, next) => {
  res.status(200);
  res.send("ok");
});

export default app;

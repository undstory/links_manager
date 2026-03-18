import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/links", linksRoutes);
export default app;

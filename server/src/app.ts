import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes";
import tagsRoutes from "./routes/tags.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/links", linksRoutes);
app.use("/tags", tagsRoutes);
app.use("/categories", categoriesRoutes);
export default app;

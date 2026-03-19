import express from "express";
import cors from "cors";
import linksRoutes from "./routes/links.routes";
import tagsRoutes from "./routes/tags.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/links", linksRoutes);
app.use("/tags", tagsRoutes);
export default app;

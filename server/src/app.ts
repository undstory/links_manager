import express from "express";
import linksRoutes from "./routes/links.routes";

const app = express();

app.use(express.json());
app.use("/links", linksRoutes);

export default app;

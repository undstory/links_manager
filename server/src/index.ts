import express from "express";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hej");
});
app.listen(port, () => {
  console.log("Server running");
});

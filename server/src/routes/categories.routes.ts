import { Router } from "express";
import { prisma } from "../lib/prisma";
import { categoryNameSchema } from "../validation/link.schema";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cats = await prisma.category.findMany();
    res.json(cats);
  } catch (e) {
    res.status(500).json({ error: "error", e });
  }
});

router.post("/", async (req, res) => {
  const parsed = categoryNameSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Niepoprawna nazwa kategorii",
      details: parsed.error.flatten(),
    });
  }
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({ data: { name } });
    res.json(newCategory);
  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(400).json({
        error: "Taka kategoria już istnieje",
      });
    }
    console.error(e);
    res.status(500).json({ error: "error", details: e });
  }
});

export default router;

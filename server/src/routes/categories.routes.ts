import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cats = await prisma.category.findMany();
    res.json(cats);
  } catch (e) {
    res.status(500).json({ error: "error", e });
  }
});

export default router;

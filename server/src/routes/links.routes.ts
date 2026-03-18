import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/latest", async (req, res) => {
  try {
    const latestLinks = await prisma.link.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    res.json(latestLinks);
  } catch {
    res.status(500).json({ error: "error" });
  }
});

export default router;

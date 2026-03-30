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

router.get("/all", async (req, res) => {
  try {
    const allLinks = await prisma.link.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        category: true,
      },
    });
    res.json(allLinks);
  } catch {
    res.status(500).json({ error: "error" });
  }
});

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedLink = await prisma.link.update({
      where: {
        id: Number(id),
      },
      data: { status },
    });
    res.json(updatedLink);
  } catch (e) {
    res.status(500).json({ error: "error" });
  }
});

export default router;

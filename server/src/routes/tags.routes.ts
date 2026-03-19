import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const grouped = await prisma.linkTag.groupBy({
      by: ["tagId"],
      _count: { tagId: true },
      orderBy: {
        _count: { tagId: "desc" },
      },
      take: 10,
    });

    const tagIds = grouped.map((t) => t.tagId);

    const tags = await prisma.tag.findMany({
      where: {
        id: { in: tagIds },
      },
    });

    const result = grouped.map((g) => {
      const tag = tags.find((t) => t.id === g.tagId);

      return {
        name: tag?.name,
        count: g._count.tagId,
      };
    });

    res.json(result);
  } catch {
    res.status(500).json({ error: "error" });
  }
});

export default router;

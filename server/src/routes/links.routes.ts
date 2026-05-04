import { Router } from "express";
import { prisma } from "../lib/prisma";
import { linkSchema } from "../validation/link.schema";
import { normalizeText, formatTitle } from "../utils/formatters";
import { Prisma } from "@prisma/client";

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

router.put("/:id", async (req, res) => {
  const linkId = Number(req.params.id);

  if (isNaN(linkId)) {
    return res.status(400).json({ error: "Niepoprawne ID" });
  }

  const parsed = linkSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Podałeś niepoprawne dane",
      details: parsed.error.flatten(),
    });
  }

  const { title, url, description, categoryId, isFavorite, tags, status } =
    parsed.data;

  try {
    const existingLink = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return res.status(404).json({ error: "Link nie istnieje" });
    }

    let tagRecords: { id: number }[] = [];

    if (tags && tags.length > 0) {
      tagRecords = await Promise.all(
        tags.map(async (tagName: string) => {
          return prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
        }),
      );
    }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        title: formatTitle(title),
        url: normalizeText(url),
        description: description ? normalizeText(description) : undefined,
        categoryId,
        isFavorite: isFavorite ?? false,
        status: status ?? existingLink.status,

        ...(tags && {
          tags: {
            deleteMany: {},
            create: tagRecords.map((tag) => ({
              tag: {
                connect: { id: tag.id },
              },
            })),
          },
        }),
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

    await prisma.tag.deleteMany({
      where: {
        links: {
          none: {},
        },
      },
    });

    res.json(updatedLink);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "error", details: e });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLink = (await prisma.link.delete({
      where: { id: Number(id) },
      include: {
        tags: true,
      },
    })) as Prisma.LinkGetPayload<{
      include: { tags: true };
    }>;

    const count = await prisma.link.count({
      where: { categoryId: deletedLink.categoryId },
    });

    if (count === 0) {
      await prisma.category.delete({
        where: { id: deletedLink.categoryId },
      });
    }

    for (const linkTag of deletedLink.tags) {
      const count = await prisma.linkTag.count({
        where: { tagId: linkTag.tagId },
      });

      if (count === 0) {
        await prisma.tag.delete({
          where: { id: linkTag.tagId },
        });
      }
    }

    res.json(deletedLink);
  } catch (e) {
    res.status(500).json({ error: "error" });
  }
});

router.post("/", async (req, res) => {
  const parsed = linkSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Podałeś niepoprawne dane",
      details: parsed.error.flatten(),
    });
  }

  const { title, url, description, categoryId, isFavorite, tags } = parsed.data;

  const tagRecords = await Promise.all(
    tags?.map(async (tagName: string) => {
      return prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
    }) ?? [],
  );

  try {
    const newLink = await prisma.link.create({
      data: {
        title: formatTitle(title),
        url: normalizeText(url),
        description: description ? normalizeText(description) : undefined,
        categoryId,
        isFavorite: isFavorite ?? false,
        tags: {
          create: tagRecords.map((tag) => ({
            tag: {
              connect: { id: tag.id },
            },
          })),
        },
      },
    });

    res.json(newLink);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "error", details: e });
  }
});

export default router;

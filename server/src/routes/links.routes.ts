import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const links = await prisma.link.findMany();

  res.json(links);
});

export default router;

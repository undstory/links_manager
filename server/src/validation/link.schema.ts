import { z } from "zod";

export const linkSchema = z.object({
  title: z
    .string()
    .min(1, "Tytuł jest wymagany")
    .max(255, "Tytuł jest za długi"),
  url: z.string().url("Invalid URL"),
  description: z.string().max(500).optional(),
  categoryId: z.number(),
  tags: z.array(z.number()).optional(),
  isFavorite: z.boolean().optional(),
});

export const categoryNameSchema = z.object({
  name: z
    .string()
    .min(3, "Min 3 znaki")
    .max(30, "Max 30 znaków")
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9 -]+$/, "Niepoprawne znaki"),
});

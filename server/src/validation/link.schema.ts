import { z } from "zod";

export const linkSchema = z.object({
  title: z
    .string()
    .min(4, "Tytuł jest nadal za krótki")
    .max(255, "Tytuł jest za długi"),
  url: z.string().url("Niewłaściwy format URL"),
  description: z.string().max(500).optional(),
  categoryId: z.number(),
  tags: z
    .array(z.string().max(10, "Tag powinien mieć max 10 znaków"))
    .max(3, "Max 3 tagi")
    .optional(),
  isFavorite: z.boolean().optional(),
});

export const categoryNameSchema = z.object({
  name: z
    .string()
    .min(3, "Min 3 znaki")
    .max(30, "Max 30 znaków")
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9 -]+$/, "Niepoprawne znaki"),
});

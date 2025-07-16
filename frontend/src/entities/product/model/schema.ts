import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  article: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().nonnegative(),
  createdAt: z.string().transform((v) => new Date(v)),
});

// Используем `omit`, а потом "переопределяем" нужные поля
export const productCreateSchema = productSchema
  .omit({ id: true, createdAt: true })
  .extend({
    price: z.preprocess(
      (val) => Number(val),
      z.number().positive("Цена должна быть положительным числом")
    ),
    quantity: z.preprocess(
      (val) => Number(val),
      z.number().nonnegative("Количество не может быть отрицательным")
    ),
  });

export type Product = z.infer<typeof productSchema>;
export type ProductCreate = z.infer<typeof productCreateSchema>;
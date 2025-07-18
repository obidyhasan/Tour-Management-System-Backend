import z from "zod";

export const createDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(1, { message: "Name must be at least 1 characters" }),

  thumbnail: z
    .string({ invalid_type_error: "Thumbnail must be string" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Description must be string" })
    .optional(),
});

export const updateDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(1, { message: "Name must be at least 1 characters" })
    .optional(),

  thumbnail: z
    .string({ invalid_type_error: "Thumbnail must be string" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Description must be string" })
    .optional(),
});

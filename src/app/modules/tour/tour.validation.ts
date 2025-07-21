import z, { number, string } from "zod";

// ------------------- Tour Type --------------------
export const createTourTypeZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(1, { message: "Name must be at least 1 characters" }),
});

export const updateTourTypeZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(1, { message: "Name must be at least 1 characters" })
    .optional(),
});

// -------------------- Tour -------------------------
export const createTourZodSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(string()).optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  included: z.array(string()).optional(),
  excluded: z.array(string()).optional(),
  amenities: z.array(string()).optional(),
  tourPlan: z.array(string()).optional(),
  maxGuest: number().optional(),
  minAge: z.number().optional(),
  tourType: z.string(), // <- changed here
  division: z.string(), // <- changed here
});
export const updateTourZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(string()).optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  included: z.array(string()).optional(),
  excluded: z.array(string()).optional(),
  amenities: z.array(string()).optional(),
  tourPlan: z.array(string()).optional(),
  maxGuest: number().optional(),
  minAge: z.number().optional(),
});

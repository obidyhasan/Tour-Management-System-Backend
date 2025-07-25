import z from "zod";

export const forgotPasswordRequestZodSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." }),
});

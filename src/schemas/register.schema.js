import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email."),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),

  birthDate: z
    .string()
    .min(1, "Birth date is required.")
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
})
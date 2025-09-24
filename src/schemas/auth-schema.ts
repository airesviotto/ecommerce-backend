import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
                .min(6)
                .regex(/[A-Z]/)
                .regex(/[a-z]/)
                .regex(/[^A-Za-z0-9]/)
});
import z from 'zod';

export const CategoryValidator = z.object({
  name: z.string().min(1, `Name is required`).max(64, `Name is too long (max 64)`)
});
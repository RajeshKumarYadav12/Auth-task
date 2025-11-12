import { z } from 'zod';

// Auth Schemas
export const signupSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  role: z.enum(['User', 'Admin'], {
    errorMap: () => ({ message: 'Role must be either User or Admin' }),
  }),
});

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
});

// Item Schemas
export const itemSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  category: z.enum(['Work', 'Personal', 'Shopping', 'Health', 'Other'], {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  status: z.enum(['Active', 'Completed', 'Pending'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }).optional(),
  priority: z.enum(['Low', 'Medium', 'High'], {
    errorMap: () => ({ message: 'Invalid priority' }),
  }).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ItemInput = z.infer<typeof itemSchema>;

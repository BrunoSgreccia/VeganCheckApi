import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  GROQ_API_KEY: z.string().default(''),
  GROQ_MODEL: z.string().min(1).default('llama-3.2-11b-vision-preview'),
  MAX_IMAGE_SIZE_MB: z.coerce.number().int().positive().default(10)
});

export type AppEnv = z.infer<typeof envSchema>;

export const appEnv: AppEnv = envSchema.parse(process.env);

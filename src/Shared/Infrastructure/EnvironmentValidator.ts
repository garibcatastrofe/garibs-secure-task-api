import { z } from 'zod';
import { IEnvironment, ENUM_NODE_ENV } from '../Domain/Entities/IEnvironment';

const environmentSchema = z.object({
  NODE_ENV: z.enum([ENUM_NODE_ENV.development, ENUM_NODE_ENV.production]),
  PORT: z.number().int().positive(),
  DATABASE_URL: z.string(),
});

export function validateEnvironment(env: unknown): IEnvironment {
  return environmentSchema.parse(env);
}

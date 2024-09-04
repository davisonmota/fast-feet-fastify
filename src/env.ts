import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  PORT: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables.')
  throw new Error('Invalid environment variables.')
}

export const env = _env.data

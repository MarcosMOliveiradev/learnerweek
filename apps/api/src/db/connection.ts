import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '../lib/env'
import { schema } from './drizzle/index'

const conection = postgres(env.DATABASE_URL)

export const db = drizzle(conection, {schema})
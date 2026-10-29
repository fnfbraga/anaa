import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from '$lib/server/schema';
import { dbHost, dbName, dbPassword, dbUser } from '$lib/server/config';

const { Pool } = pkg;

export const pool = new Pool({
	host: dbHost,
	port: 5499,
	user: dbUser,
	password: dbPassword,
	database: dbName
});

export const db = drizzle(pool, { schema });

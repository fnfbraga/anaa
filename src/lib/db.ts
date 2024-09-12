import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from './schema';
import { dbHost, dbName, dbPassword, dbUser } from './config';

const { Client } = pkg;

export const client = new Client({
	host: dbHost,
	port: 5499,
	user: dbUser,
	password: dbPassword,
	database: dbName
});
await client.connect();

export const db = drizzle(client, { schema });

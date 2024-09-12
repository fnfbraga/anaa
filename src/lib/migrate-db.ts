import { db } from './db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export default async function () {
	console.info('migrating schema');
	await migrate(db as any, { migrationsFolder: './drizzle' })
		.then(() => {
			console.info('migrated schema');
		})
		.catch((e) => {
			console.error('error migrating schema: ', e);
		});
}

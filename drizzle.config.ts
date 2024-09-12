import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/schema.ts',
	out: './drizzle',
	dialect: 'postgresql'
});

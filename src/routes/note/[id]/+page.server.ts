import { db } from '$lib/db';
import { decrypt, encrypt } from '$lib/encryption';
import { items } from '$lib/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = +(params.id || '');
	const note = id ? await db.select().from(items).where(eq(items.id, id)) : null;
	return {
		...note?.map((item) => ({
			...item,
			note: decrypt(JSON.parse(item.note || '{}') as any)
		}))[0]
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		const data = JSON.parse(formData.get('data') as string);
		await db.insert(items).values({
			name: data.name,
			note: JSON.stringify(encrypt(data.note)),
			type: 'note',
			tags: data.tags
		});
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = +(formData.get('id') as string);
		await db.delete(items).where(eq(items.id, +id));
	},
	edit: async ({ request }) => {
		const formData = await request.formData();
		const data = JSON.parse(formData.get('data') as string);
		await db
			.update(items)
			.set({
				name: data.name,
				note: JSON.stringify(encrypt(data.note)),
				tags: data.tags
			})
			.where(eq(items.id, data.id));
	}
};

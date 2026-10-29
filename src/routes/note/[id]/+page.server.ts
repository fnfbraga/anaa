import { db } from '$lib/server/db';
import { decrypt, encrypt } from '$lib/server/encryption';
import { items } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const NoteSchema = z.object({
	name: z.string().min(1),
	note: z.string().min(1),
	tags: z.array(z.string()).optional().default([])
});

function parseNoteFormData(formData: FormData) {
	const rawJson = formData.get('data');
	if (typeof rawJson === 'string') {
		return NoteSchema.safeParse(JSON.parse(rawJson));
	}
	return NoteSchema.safeParse({
		name: String(formData.get('name') ?? ''),
		note: String(formData.get('note') ?? ''),
		tags: formData
			.getAll('tags')
			.map((t) => String(t).trim())
			.filter(Boolean)
	});
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(303, '/sign-in');
	}

	if (params.id === 'new') {
		return {
			id: undefined,
			name: '',
			note: '',
			tags: [] as string[],
			favorite: 'false'
		};
	}

	const id = +(params.id || '');
	const note = id ? await db.select().from(items).where(eq(items.id, id)) : null;
	return {
		...note?.map((item) => ({
			...item,
			note: decrypt(JSON.parse(item.note || '{}'))
		}))[0]
	};
};

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session?.user) {
			throw redirect(303, '/sign-in');
		}

		const formData = await request.formData();
		const parsed = parseNoteFormData(formData);
		if (!parsed.success) {
			return fail(400, { error: 'Invalid note data' });
		}

		const data = parsed.data;
		await db.insert(items).values({
			name: data.name,
			note: JSON.stringify(encrypt(data.note)),
			type: 'note',
			tags: data.tags
		});

		throw redirect(303, '/');
	},
	delete: async ({ request, params, locals }) => {
		const session = await locals.getSession();
		if (!session?.user) {
			throw redirect(303, '/sign-in');
		}

		const formData = await request.formData();
		const id = +((formData.get('id') as string) || params.id || '');
		if (!id) {
			return fail(400, { error: 'Invalid note ID' });
		}

		await db.delete(items).where(eq(items.id, id));
		throw redirect(303, '/');
	},
	edit: async ({ request, params, locals }) => {
		const session = await locals.getSession();
		if (!session?.user) {
			throw redirect(303, '/sign-in');
		}

		const formData = await request.formData();
		const parsed = parseNoteFormData(formData);
		const id = +((formData.get('id') as string) || params.id || '');
		if (!parsed.success || !id) {
			return fail(400, { error: 'Invalid note data' });
		}

		const data = parsed.data;
		await db
			.update(items)
			.set({
				name: data.name,
				note: JSON.stringify(encrypt(data.note)),
				tags: data.tags
			})
			.where(eq(items.id, id));

		throw redirect(303, '/');
	}
};

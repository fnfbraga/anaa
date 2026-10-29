import { db } from '$lib/server/db';
import { decrypt, encrypt } from '$lib/server/encryption';
import { items } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const LoginSchema = z.object({
	name: z.string().min(1),
	url: z.string().optional().default(''),
	username: z.string().default(''),
	password: z.string().default(''),
	tags: z.array(z.string()).optional().default([])
});

function parseLoginFormData(formData: FormData) {
	const rawJson = formData.get('data');
	if (typeof rawJson === 'string') {
		return LoginSchema.safeParse(JSON.parse(rawJson));
	}
	return LoginSchema.safeParse({
		name: String(formData.get('name') ?? ''),
		url: String(formData.get('url') ?? ''),
		username: String(formData.get('username') ?? ''),
		password: String(formData.get('password') ?? ''),
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
			url: '',
			username: '',
			password: '',
			tags: [] as string[],
			favorite: 'false'
		};
	}

	const id = +(params.id || '');
	const login = id ? await db.select().from(items).where(eq(items.id, id)) : null;
	return {
		...login?.map((item) => ({
			...item,
			username: decrypt(JSON.parse(item.username || '{}')),
			password: decrypt(JSON.parse(item.password || '{}'))
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
		const parsed = parseLoginFormData(formData);
		if (!parsed.success) {
			return fail(400, { error: 'Invalid login data' });
		}

		const data = parsed.data;
		await db.insert(items).values({
			name: data.name,
			url: data.url || '',
			username: JSON.stringify(encrypt(data.username)),
			password: JSON.stringify(encrypt(data.password)),
			type: 'login',
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
			return fail(400, { error: 'Invalid login ID' });
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
		const parsed = parseLoginFormData(formData);
		const id = +((formData.get('id') as string) || params.id || '');
		if (!parsed.success || !id) {
			return fail(400, { error: 'Invalid login data' });
		}

		const data = parsed.data;
		await db
			.update(items)
			.set({
				name: data.name,
				url: data.url || '',
				username: JSON.stringify(encrypt(data.username)),
				password: JSON.stringify(encrypt(data.password)),
				tags: data.tags
			})
			.where(eq(items.id, id));

		throw redirect(303, '/');
	}
};

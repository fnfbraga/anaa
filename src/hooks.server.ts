import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { googleClientId, googleClientSecret } from '$lib/config';
import type { Handle } from '@sveltejs/kit';

// Don't forget to set the AUTH_SECRET environment variable. This should be a minimum of 32 characters, random string
export const handle = (async ({ event, resolve }: any) => {
	const svelteKitAuth = SvelteKitAuth({
		providers: [
			// @ts-expect-error -- ignore
			GoogleProvider({
				clientId: googleClientId,
				clientSecret: googleClientSecret,
				authorization: {
					params: {
						prompt: 'consent',
						access_type: 'offline',
						response_type: 'code'
					}
				}
			})
		],
		callbacks: {
			async session({ session, token }) {
				return { ...session, user: { ...session.user, refreshToken: token.refreshToken } };
			},
			async jwt({ token, account }) {
				if (account?.refresh_token) {
					return { ...token, refreshToken: account?.refresh_token };
				}
				return token;
			}
		}
	});
	const response = await svelteKitAuth({ event, resolve });
	return response;
}) satisfies Handle;

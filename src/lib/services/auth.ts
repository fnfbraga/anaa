import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { allowedUsers, googleClientId, googleClientSecret } from '$lib/config';
import { AUTH_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const svelteKitAuth = SvelteKitAuth({
	trustHost: true,
	debug: true,
	secret: AUTH_SECRET,
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
			if (!allowedUsers.includes(session.user?.email || '')) {
				error(401, 'not authorized');
			}
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

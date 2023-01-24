import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { allowedUsers, googleClientId, googleClientSecret } from '$lib/config';

export const svelteKitAuth = SvelteKitAuth({
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
				throw new Error('Not allowed');
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

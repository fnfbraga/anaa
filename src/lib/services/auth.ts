import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { googleClientId, googleClientSecret } from '$lib/config';

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

<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import GoogleLogo from '$lib/components/GoogleLogo.svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	export let loading = false;

	const handleSignIn = async () => {
		loading = true;
		try {
			await signIn('google', { callbackUrl: '/' });
		} catch (e) {
			console.error(e);
			loading = false;
		}
	};
</script>

<div
	id="sign-in-container"
	class="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-8"
>
	<Card class="w-full max-w-md shadow-xl border-border/80">
		<CardHeader class="items-center text-center space-y-3 pb-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md"
				aria-hidden="true"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-7 w-7"
				>
					<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
			</div>
			<Badge variant="secondary" class="px-3 py-0.5 text-xs font-semibold tracking-wide">
				ANAA VAULT
			</Badge>
			<div class="space-y-1.5">
				<CardTitle tag="h1" class="text-2xl font-bold tracking-tight">
					Welcome back
				</CardTitle>
				<CardDescription class="text-sm text-muted-foreground max-w-xs mx-auto">
					Sign in to access your encrypted logins and secure notes anywhere.
				</CardDescription>
			</div>
		</CardHeader>

		<CardContent class="space-y-4">
			<Button
				type="button"
				size="lg"
				disabled={loading}
				on:click={handleSignIn}
				class="w-full h-12 text-base font-semibold gap-3 shadow-sm"
			>
				<span class="flex h-6 w-6 items-center justify-center rounded-full bg-white p-0.5">
					<GoogleLogo />
				</span>
				<span>{!loading ? 'Sign In with Google' : 'Signing in...'}</span>
			</Button>

			<div class="grid grid-cols-2 gap-2.5 pt-2">
				<div class="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4 text-primary shrink-0"
						aria-hidden="true"
					>
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
					</svg>
					<span>Encrypted storage</span>
				</div>
				<div class="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4 text-primary shrink-0"
						aria-hidden="true"
					>
						<rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
						<path d="M12 18h.01" />
					</svg>
					<span>Mobile PWA ready</span>
				</div>
			</div>
		</CardContent>

		<CardFooter class="justify-center border-t border-border/50 pt-4 text-center">
			<p class="text-xs text-muted-foreground">
				Protected by Google OAuth &amp; server-side encryption
			</p>
		</CardFooter>
	</Card>
</div>

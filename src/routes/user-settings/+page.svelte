<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Avatar } from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: userData = $page.data.session?.user;
	let isDark = false;

	function setTheme(dark: boolean) {
		isDark = dark;
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', dark);
			try {
				localStorage.setItem('anaa-theme', dark ? 'dark' : 'light');
			} catch {}
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			isDark = document.documentElement.classList.contains('dark');
		}
	});
</script>

<Modal closeRoute="/" title="User Settings">
	<div class="space-y-4">
		<Card class="bg-muted/30">
			<CardContent class="flex items-center gap-4 p-4">
				<Avatar
					src={userData?.image}
					alt={userData?.name || data.clientEmail || 'User'}
					class="h-12 w-12"
				/>
				<div class="min-w-0 flex-1 space-y-1">
					{#if userData?.name}
						<p class="text-base font-semibold text-foreground truncate">{userData.name}</p>
					{/if}
					<p class="text-sm text-muted-foreground truncate">User: {data.clientEmail}</p>
				</div>
			</CardContent>
		</Card>

		<div class="rounded-xl border border-border p-4 space-y-3">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-foreground">Appearance</p>
					<p class="text-xs text-muted-foreground">Choose your preferred color theme</p>
				</div>
				<div class="inline-flex rounded-lg border border-border bg-muted p-1">
					<button
						type="button"
						on:click={() => setTheme(false)}
						class="rounded-md px-3 py-1 text-xs font-medium transition-colors {!isDark
							? 'bg-background text-foreground shadow-xs'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Light
					</button>
					<button
						type="button"
						on:click={() => setTheme(true)}
						class="rounded-md px-3 py-1 text-xs font-medium transition-colors {isDark
							? 'bg-background text-foreground shadow-xs'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Dark
					</button>
				</div>
			</div>

			<div class="flex items-center justify-between pt-3 border-t border-border/60">
				<span class="text-sm font-medium text-foreground">Application Version</span>
				<Badge variant="outline" class="font-mono text-xs">version: 1.1</Badge>
			</div>
		</div>

		<div class="pt-2">
			<Button
				type="button"
				variant="destructive"
				class="w-full"
				on:click={() => signOut()}
			>
				Sign Out
			</Button>
		</div>
	</div>
</Modal>

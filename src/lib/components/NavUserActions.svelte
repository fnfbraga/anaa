<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar } from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator';
	import { signOut } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	$: userData = $page.data.session?.user;

	let isOpen = false;
	let menuWrapper: HTMLDivElement | undefined;
	let isDark = false;

	$: userInitials = (userData?.name || userData?.email || 'U')
		.split(' ')
		.map((v: string) => v[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

	function toggleTheme() {
		if (typeof document === 'undefined') return;
		isDark = !document.documentElement.classList.contains('dark');
		document.documentElement.classList.toggle('dark', isDark);
		try {
			localStorage.setItem('anaa-theme', isDark ? 'dark' : 'light');
		} catch {}
	}

	function handleWindowClick(event: MouseEvent) {
		if (isOpen && menuWrapper && !menuWrapper.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isOpen && event.key === 'Escape') {
			isOpen = false;
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			isDark = document.documentElement.classList.contains('dark');
		}
	});
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeydown} />

<div class="relative inline-flex items-center" bind:this={menuWrapper}>
	<button
		type="button"
		aria-label="Open user menu"
		aria-haspopup="menu"
		aria-expanded={isOpen}
		on:click={() => (isOpen = !isOpen)}
		class="inline-flex h-10 w-10 items-center justify-center rounded-full ring-offset-background transition-shadow hover:ring-2 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
	>
		<Avatar
			src={userData?.image}
			alt={userData?.name || userData?.email || 'User'}
			fallback={userInitials}
			class="h-9 w-9"
		/>
	</button>

	{#if isOpen}
		<div
			id="menu-container"
			role="menu"
			aria-label="User account options"
			transition:scale={{ duration: 120, start: 0.95 }}
			class="absolute right-0 top-12 z-50 w-60 origin-top-right rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl focus:outline-none"
		>
			{#if userData}
				<div class="px-3 py-2">
					{#if userData.name}
						<p class="text-sm font-semibold leading-none text-foreground truncate">
							{userData.name}
						</p>
					{/if}
					{#if userData.email}
						<p class="mt-1 text-xs text-muted-foreground truncate">
							{userData.email}
						</p>
					{/if}
				</div>
				<Separator class="my-1" />
			{/if}

			<a
				href="/user-settings"
				role="menuitem"
				on:click={() => (isOpen = false)}
				class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4 text-muted-foreground"
					aria-hidden="true"
				>
					<path
						d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
					/>
					<circle cx="12" cy="12" r="3" />
				</svg>
				<span>User Settings</span>
			</a>

			<button
				type="button"
				role="menuitem"
				on:click={toggleTheme}
				class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent"
			>
				<span class="flex items-center gap-2.5">
					{#if isDark}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 text-muted-foreground"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2" />
							<path d="M12 20v2" />
							<path d="m4.93 4.93 1.41 1.41" />
							<path d="m17.66 17.66 1.41 1.41" />
							<path d="M2 12h2" />
							<path d="M20 12h2" />
							<path d="m6.34 17.66-1.41 1.41" />
							<path d="m19.07 4.93-1.41 1.41" />
						</svg>
						<span>Light Mode</span>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 text-muted-foreground"
							aria-hidden="true"
						>
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
						</svg>
						<span>Dark Mode</span>
					{/if}
				</span>
			</button>

			<Separator class="my-1" />

			<button
				type="button"
				role="menuitem"
				on:click={() => {
					isOpen = false;
					signOut();
				}}
				class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:bg-destructive/10"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
					aria-hidden="true"
				>
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
					<polyline points="16 17 21 12 16 7" />
					<line x1="21" x2="9" y1="12" y2="12" />
				</svg>
				<span>Logout</span>
			</button>
		</div>
	{/if}
</div>

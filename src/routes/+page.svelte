<script lang="ts">
	import LoginItem from '$lib/components/LoginItem.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import Fab from '$lib/components/FAB.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { TypesEnum } from '$lib/schema';

	export let data: PageData;

	$: activeType = $page.url.searchParams.get('type');
	$: activeSearch = $page.url.searchParams.get('search');
	$: itemCount = data.initialItems?.length || 0;
</script>

<svelte:head>
	<title>ANAA — Vault</title>
	<meta name="ANAA" content="Another Nice Auth App" />
</svelte:head>

<div class="space-y-4">
	<!-- Vault Status Bar -->
	<div class="flex flex-wrap items-center justify-between gap-2 px-1">
		<div class="flex items-center gap-2">
			<h1 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
				{#if activeType === 'login'}
					Logins
				{:else if activeType === 'note'}
					Secure Notes
				{:else}
					All Vault Items
				{/if}
			</h1>
			<Badge variant="secondary" class="text-xs font-mono">
				{itemCount}
			</Badge>
			{#if activeSearch}
				<Badge variant="outline" class="text-xs gap-1">
					<span>“{activeSearch}”</span>
				</Badge>
			{/if}
		</div>

		{#if activeType || activeSearch}
			<Button href="/" variant="ghost" size="sm" class="h-7 px-2 text-xs text-muted-foreground">
				Clear filters
			</Button>
		{/if}
	</div>

	{#if itemCount > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3.5" role="list" aria-label="Vault items">
			{#each data.initialItems as item (item.id)}
				<div role="listitem">
					{#if item.type === TypesEnum.login}
						<LoginItem login={item} />
					{/if}
					{#if item.type === TypesEnum.note}
						<NoteItem note={item} />
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<Card class="border-dashed py-12 text-center">
			<CardContent class="flex flex-col items-center justify-center space-y-4 pt-4">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
					aria-hidden="true"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-6 w-6"
					>
						<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
						<path d="M7 11V7a5 5 0 0 1 10 0v4" />
					</svg>
				</div>
				<div class="space-y-1 max-w-sm">
					<h2 class="text-base font-semibold text-foreground">
						{#if activeSearch || activeType}
							No matching items found
						{:else}
							Your vault is empty
						{/if}
					</h2>
					<p class="text-sm text-muted-foreground">
						{#if activeSearch || activeType}
							Try adjusting your search query or switching filter tabs.
						{:else}
							Add your first encrypted login or secure note to get started.
						{/if}
					</p>
				</div>
				<div class="flex flex-wrap items-center justify-center gap-2.5 pt-2">
					{#if activeSearch || activeType}
						<Button href="/" variant="outline" size="sm">Reset Filters</Button>
					{/if}
					<Button href="/login/new" size="sm">New Login</Button>
					<Button href="/note/new" variant="secondary" size="sm">New Secure Note</Button>
				</div>
			</CardContent>
		</Card>
	{/if}

	<Fab />
</div>

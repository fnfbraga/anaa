<script lang="ts">
	import type { Item } from '$lib/schema';
	import { Card } from '$lib/components/ui/card';
	import Password from './Password.svelte';
	import Tags from './Tags.svelte';
	import CopyIcon from './CopyIcon.svelte';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';

	export let login: Item;

	$: normalizedUrl = login.url
		? login.url.startsWith('http://') || login.url.startsWith('https://')
			? login.url
			: `https://${login.url}`
		: undefined;
</script>

<Card class="group relative overflow-hidden transition-all hover:border-primary/40 hover:shadow-md">
	<div class="p-4 sm:p-5 flex flex-col gap-3">
		<!-- Header Row: Icon + Name + URL + Open Details Link -->
		<div class="flex items-start justify-between gap-3">
			<a
				href={`/login/${login.id}`}
				aria-label={`View or edit login ${login.name}`}
				class="flex items-center gap-3 min-w-0 flex-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<span
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold"
					aria-hidden="true"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-5 w-5"
					>
						<circle cx="7.5" cy="15.5" r="5.5" />
						<path d="m21 2-9.6 9.6" />
						<path d="m15.5 7.5 3 3L22 7l-3-3" />
					</svg>
				</span>
				<div class="min-w-0 flex-1">
					<h3 class="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
						{login.name}
					</h3>
					{#if login.url}
						<p class="text-xs text-muted-foreground font-mono truncate mt-0.5">
							{login.url}
						</p>
					{:else}
						<p class="text-xs text-muted-foreground/70 mt-0.5">Login credential</p>
					{/if}
				</div>
			</a>

			<div class="flex items-center gap-1 shrink-0">
				{#if normalizedUrl}
					<a
						href={normalizedUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Open ${login.name} website in new tab`}
						title="Open website"
						class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
							<polyline points="15 3 21 3 21 9" />
							<line x1="10" x2="21" y1="14" y2="3" />
						</svg>
					</a>
				{/if}
				<a
					href={`/login/${login.id}`}
					aria-label={`Open details for ${login.name}`}
					class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</div>
		</div>

		<!-- Quick Credentials Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/50">
			<!-- Username Quick Copy -->
			<div class="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-1.5 min-w-0">
				<div class="min-w-0 flex-1">
					<span class="block text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
						Username
					</span>
					<span class="block text-xs font-medium text-foreground truncate select-all">
						{login.username || '—'}
					</span>
				</div>
				{#if login.username}
					<CopyIcon
						label={`Copy username for ${login.name}`}
						class="h-8 w-8"
						on:click={() => {
							handleCopytoClipBoard({
								message: 'Username copied to clipboard',
								content: login.username
							});
						}}
					/>
				{/if}
			</div>

			<!-- Password Quick Reveal & Copy -->
			<div class="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-1.5 min-w-0">
				<div class="min-w-0 flex-1">
					<span class="block text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
						Password
					</span>
					<Password disabled password={login.password} isModal={false} />
				</div>
			</div>
		</div>

		{#if login.tags && login.tags.filter(Boolean).length > 0}
			<div class="pt-0.5">
				<Tags tags={login.tags} />
			</div>
		{/if}
	</div>
</Card>

<script lang="ts">
	import type { Item } from '$lib/schema';
	import { Card } from '$lib/components/ui/card';
	import Tags from './Tags.svelte';
	import CopyIcon from './CopyIcon.svelte';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';

	export let note: Item;
</script>

<Card class="group relative overflow-hidden transition-all hover:border-emerald-500/40 hover:shadow-md">
	<div class="p-4 sm:p-5 flex flex-col gap-3">
		<div class="flex items-start justify-between gap-3">
			<a
				href={`/note/${note.id}`}
				aria-label={`View or edit note ${note.name}`}
				class="flex items-center gap-3 min-w-0 flex-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<span
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
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
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
						<polyline points="14 2 14 8 20 8" />
						<line x1="16" x2="8" y1="13" y2="13" />
						<line x1="16" x2="8" y1="17" y2="17" />
						<line x1="10" x2="8" y1="9" y2="9" />
					</svg>
				</span>
				<div class="min-w-0 flex-1">
					<h3 class="text-base font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
						{note.name}
					</h3>
					<p class="text-xs text-muted-foreground mt-0.5">Secure Note</p>
				</div>
			</a>

			<div class="flex items-center gap-1 shrink-0">
				{#if note.note}
					<CopyIcon
						label={`Copy note ${note.name}`}
						on:click={() => {
							handleCopytoClipBoard({
								message: 'Note copied to clipboard',
								content: note.note
							});
						}}
					/>
				{/if}
				<a
					href={`/note/${note.id}`}
					aria-label={`Open note ${note.name}`}
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

		{#if note.note}
			<a
				href={`/note/${note.id}`}
				tabindex="-1"
				class="block rounded-lg bg-muted/50 px-3.5 py-2.5 font-mono text-xs text-muted-foreground line-clamp-2 whitespace-pre-wrap break-words hover:bg-muted/80 transition-colors"
			>
				{note.note}
			</a>
		{/if}

		{#if note.tags && note.tags.filter(Boolean).length > 0}
			<div class="pt-0.5">
				<Tags tags={note.tags} />
			</div>
		{/if}
	</div>
</Card>

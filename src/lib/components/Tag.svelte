<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

	export let tag: string | undefined | null;
	export let edit = false;
</script>

{#if tag}
	<Badge
		variant="secondary"
		class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium"
		{...$$restProps}
	>
		<span>{tag}</span>
		{#if edit}
			<button
				type="button"
				aria-label={`Remove tag ${tag}`}
				on:click
				class="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-3 w-3"
					aria-hidden="true"
				>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</button>
		{/if}
	</Badge>
{/if}

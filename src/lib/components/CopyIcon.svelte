<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cn } from '$lib/utils';

	export let disabled = false;
	export let label = 'Copy to clipboard';
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher();
	let copied = false;
	let timeoutId: ReturnType<typeof setTimeout>;

	function handleClick(event: MouseEvent) {
		event.stopPropagation();
		if (disabled) return;
		copied = true;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			copied = false;
		}, 1800);
		dispatch('click', event);
	}
</script>

<button
	type="button"
	{disabled}
	aria-label={copied ? 'Copied' : label}
	title={copied ? 'Copied!' : label}
	on:click={handleClick}
	on:keypress
	class={cn(
		'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40',
		copied && 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
		className
	)}
>
	{#if copied}
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
			<polyline points="20 6 9 17 4 12" />
		</svg>
	{:else}
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
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</svg>
	{/if}
</button>

<script lang="ts">
	import { cn } from '$lib/utils';

	export let active = false;
	export let href: string | undefined = undefined;
	let className = '';
	export { className as class };

	$: triggerClasses = cn(
		'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		active
			? 'bg-background text-foreground shadow-sm font-semibold'
			: 'text-muted-foreground hover:text-foreground hover:bg-background/50',
		className
	);
</script>

{#if href}
	<a
		{href}
		role="tab"
		aria-selected={active}
		class={triggerClasses}
		on:click
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		type="button"
		role="tab"
		aria-selected={active}
		class={triggerClasses}
		on:click
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

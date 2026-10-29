<script lang="ts">
	import { cn } from '$lib/utils';

	export let src: string | null | undefined = undefined;
	export let alt: string = '';
	export let fallback: string = '';

	let imageError = false;
	let className = '';
	export { className as class };
</script>

<span
	class={cn(
		'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted text-muted-foreground',
		className
	)}
	{...$$restProps}
>
	{#if src && !imageError}
		<img
			{src}
			{alt}
			referrerpolicy="no-referrer"
			on:error={() => (imageError = true)}
			class="aspect-square h-full w-full object-cover"
		/>
	{:else}
		<span class="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
			{fallback || alt.slice(0, 2) || 'U'}
		</span>
	{/if}
</span>

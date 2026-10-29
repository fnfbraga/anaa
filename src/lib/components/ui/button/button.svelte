<script lang="ts">
	import { cn } from '$lib/utils';
	import { buttonVariants, type Variant, type Size } from './index';

	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: Variant = 'default';
	export let size: Size = 'default';
	export let disabled = false;

	let className = '';
	export { className as class };
</script>

{#if href && !disabled}
	<a
		{href}
		class={cn(buttonVariants({ variant, size }), className)}
		on:click
		on:keydown
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={cn(buttonVariants({ variant, size }), className)}
		on:click
		on:keydown
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

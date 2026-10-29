<script lang="ts">
	import { Button as UiButton, type Variant, type Size } from '$lib/components/ui/button';

	export let color: string = '';
	export let text: string = '';
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: Variant | undefined = undefined;
	export let size: Size = 'default';

	$: resolvedVariant =
		variant ??
		(color.includes('red')
			? 'destructive'
			: color.includes('sky') || color.includes('blue')
			? 'default'
			: 'outline');
</script>

<UiButton
	{type}
	{disabled}
	variant={resolvedVariant}
	{size}
	on:click
	{...$$restProps}
>
	{#if text}
		{text}
	{/if}
	<slot />
</UiButton>

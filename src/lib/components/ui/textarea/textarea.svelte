<script lang="ts">
	import { cn } from '$lib/utils';

	export let value: string | null | undefined = '';
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	let className = '';
	export { className as class };
</script>

<textarea
	bind:value
	{readonly}
	{disabled}
	class={cn(
		'flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted/40',
		className
	)}
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
></textarea>

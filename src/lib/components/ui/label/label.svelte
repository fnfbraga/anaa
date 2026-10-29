<script lang="ts">
	import { cn } from '$lib/utils';

	export let forId: string | undefined = undefined;
	let className = '';
	export { className as class };
</script>

<label
	for={forId || $$restProps.for}
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground',
		className
	)}
	{...$$restProps}
>
	<slot />
</label>

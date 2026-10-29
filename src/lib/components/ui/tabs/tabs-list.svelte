<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div
	role="tablist"
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
		className
	)}
	{...$$restProps}
>
	<slot />
</div>

<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div
	class={cn(
		'flex flex-col-reverse sm:flex-row sm:justify-end gap-2 px-6 py-4 border-t border-border/60 bg-muted/20',
		className
	)}
	{...$$restProps}
>
	<slot />
</div>

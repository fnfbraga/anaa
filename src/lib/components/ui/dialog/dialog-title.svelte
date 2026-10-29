<script lang="ts">
	import { cn } from '$lib/utils';

	export let id = 'dialog-title';
	let className = '';
	export { className as class };
</script>

<h2
	{id}
	class={cn('text-lg font-semibold leading-none tracking-tight text-foreground', className)}
	{...$$restProps}
>
	<slot />
</h2>

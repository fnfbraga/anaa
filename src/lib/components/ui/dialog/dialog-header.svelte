<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div
	class={cn('flex flex-col space-y-1.5 px-6 pt-5 pb-4 border-b border-border/60', className)}
	{...$$restProps}
>
	<slot />
</div>

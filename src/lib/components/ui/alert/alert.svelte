<script lang="ts">
	import { cn } from '$lib/utils';
	import { alertVariants, type Variant } from './index';

	export let variant: Variant = 'default';
	let className = '';
	export { className as class };
</script>

<div role="alert" class={cn(alertVariants({ variant }), className)} {...$$restProps}>
	<slot />
</div>

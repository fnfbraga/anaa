<script lang="ts">
	import { createPopperActions } from 'svelte-popperjs';

	const [, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});
</script>

<div
	role="tooltip"
	class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md"
	id="tooltip"
	use:popperContent
>
	<slot />
	<div id="arrow" data-popper-arrow></div>
</div>

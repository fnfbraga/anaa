<script lang="ts">
	import { createPopperActions } from 'svelte-popperjs';

	const [, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});
</script>

<div class="bg-black p-2  rounded-md text-white" id="tooltip" use:popperContent>
	<slot />
	<div id="arrow" data-popper-arrow />
</div>

<script lang="ts">
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';

	const [nameRef, popperNameContent] = createPopperActions(popperOptions);
	export let name: string | undefined;
	export let handleShowModal: () => void;
	export let edit = false;
	let showTooltip = false;
</script>

<span
	on:click={handleShowModal}
	on:keypress={handleShowModal}
	on:mouseover={() => (showTooltip = true)}
	on:focus={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
>
	{#if showTooltip && !edit}
		<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperNameContent>
			{name}
		</div>
	{/if}
	<p class="text-sm">NAME</p>
	<span class="flex items-center h-6 ">
		<p class="truncate" use:nameRef>
			{#if edit}
				<input
					value={name}
					on:input
					class="p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900"
				/>
			{:else}
				{name}
			{/if}
		</p>
	</span>
</span>

<script lang="ts">
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';
	import CopyIcon from './CopyIcon.svelte';

	const [urlRef, popperUrlContent] = createPopperActions(popperOptions);
	export let url: string | undefined;
	export let edit = false;

	let showTooltip = false;
</script>

<span
	on:mouseover={() => (showTooltip = true)}
	on:focus={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
>
	{#if showTooltip}
		<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperUrlContent>
			{url}
		</div>
	{/if}
	<p class="font-normal from-neutral text-sm">URL</p>
	<span class="flex items-center h-6 ">
		<p class="truncate" use:urlRef>
			{#if edit}
				<input
					value={url}
					on:input
					class="p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900"
				/>
			{:else}
				{url}
			{/if}
		</p>
		<CopyIcon
			on:keypress={() => alert('copy')}
			on:click={() => {
				navigator.clipboard.writeText(url || '');
				alert(`copied ${url}`);
			}}
		/>
	</span>
</span>

<script lang="ts">
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';
	import CopyIcon from './CopyIcon.svelte';
	import Input from './Input.svelte';

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
	{#if showTooltip && url}
		<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperUrlContent>
			{url}
		</div>
	{/if}
	<span class="flex items-center h-6">
		<p class="truncate w-3/4" use:urlRef>
			{#if edit}
				<div class="mt-8">
					<Input on:input inputValue={url} label="url" inputType="url" />
				</div>
			{:else}
				<p class="text-xs">{url}</p>
			{/if}
		</p>
		<span class={edit ? 'mt-8' : ''}>
			<CopyIcon
				disabled={!url}
				on:keypress={() =>
					handleCopytoClipBoard({ message: `url copied to clipboard`, content: url })}
				on:click={() => {
					handleCopytoClipBoard({ message: `url copied to clipboard`, content: url });
				}}
			/>
		</span>
	</span>
</span>

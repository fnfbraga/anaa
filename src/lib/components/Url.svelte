<script lang="ts">
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';
	import CopyIcon from './CopyIcon.svelte';
	import Input from './Input.svelte';

	export let url: string | undefined;
	export let edit = false;

	$: normalizedHref = url
		? url.startsWith('http://') || url.startsWith('https://')
			? url
			: `https://${url}`
		: undefined;
</script>

<div class="inline-flex items-center gap-1 min-w-0 max-w-full">
	{#if edit}
		<div class="flex-1 min-w-0">
			<Input on:input inputValue={url} label="url" inputType="url" />
		</div>
	{:else if url}
		<a
			href={normalizedHref}
			target="_blank"
			rel="noopener noreferrer"
			on:click|stopPropagation
			class="truncate text-xs text-muted-foreground hover:text-primary hover:underline font-mono"
			title={url}
		>
			{url}
		</a>
		<CopyIcon
			label="Copy URL"
			class="h-8 w-8"
			on:click={() => {
				handleCopytoClipBoard({ message: 'URL copied to clipboard', content: url });
			}}
		/>
	{/if}
</div>

<script lang="ts">
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';
	import CopyIcon from './CopyIcon.svelte';
	import Input from './Input.svelte';

	export let username: string | undefined;
	export let edit = false;
</script>

<div class="inline-flex items-center gap-1 min-w-0 max-w-full">
	{#if edit}
		<div class="flex-1 min-w-0">
			<Input label="username" on:input inputValue={username} />
		</div>
	{:else if username}
		<span class="truncate text-sm text-foreground/90 font-medium" title={username}>
			{username}
		</span>
	{:else}
		<span class="text-xs italic text-muted-foreground">No username</span>
	{/if}
	{#if username}
		<CopyIcon
			label="Copy username"
			class="h-8 w-8"
			on:click={() => {
				handleCopytoClipBoard({ message: 'Username copied to clipboard', content: username });
			}}
		/>
	{/if}
</div>

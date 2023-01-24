<script lang="ts">
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';
	import CopyIcon from './CopyIcon.svelte';
	import ShowIcon from './ShowIcon.svelte';
	import Input from './Input.svelte';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-cllipboard';

	const [passwordRef, popperPasswordContent] = createPopperActions(popperOptions);
	export let isModal = true;
	export let password: string | undefined;
	export let edit = false;
	export let disabled: boolean;
	$: isEdit = edit;
	export let classes: string = '';

	let showTooltip = false;
	$: masked = true;
</script>

<span class="flex items-center">
	<span
		class="truncate font-mono ${classes} w-3/4"
		on:mouseover={() => (showTooltip = true)}
		on:focus={() => (showTooltip = true)}
		on:mouseleave={() => (showTooltip = false)}
		use:passwordRef
	>
		{#if showTooltip && !masked}
			<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperPasswordContent>
				{password}
			</div>
		{:else}{/if}
		<div class="truncate">
			<Input
				label={isModal ? 'password' : ''}
				inputType={masked ? 'password' : 'input'}
				id="password-input"
				on:input
				bind:inputValue={password}
				disabled={disabled || !isModal}
				{isModal}
			/>
		</div>
	</span>
	{#if password?.length}
		<span class={isEdit ? 'flex' : 'flex'}>
			<ShowIcon
				{masked}
				on:click={() => (masked = !masked)}
				on:keypress={() => (masked = !masked)}
			/>
			<CopyIcon
				on:keypress={() => alert('copy')}
				on:click={() => {
					handleCopytoClipBoard({ message: `password copied to clipboard`, content: password });
				}}
			/>
		</span>
	{/if}
</span>

<script lang="ts">
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';
	import CopyIcon from './CopyIcon.svelte';
	import ShowIcon from './ShowIcon.svelte';
	import Input from './Input.svelte';

	const [passwordRef, popperPasswordContent] = createPopperActions(popperOptions);
	export let password: string | undefined;
	export let edit = false;
	$: isEdit = edit;
	export let classes: string = '';

	let showTooltip = false;
	const mask = '********';
	let masked = isEdit ? false : true;
</script>

<span>
	<span class="flex items-center">
		<p
			class="truncate font-mono ${classes} w-full"
			on:mouseover={() => (showTooltip = true)}
			on:focus={() => (showTooltip = true)}
			on:mouseleave={() => (showTooltip = false)}
			use:passwordRef
		>
			{#if showTooltip && !masked}
				<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperPasswordContent>
					{password}
				</div>
			{/if}
			{#if edit}
				<Input
					placeholder="Password"
					inputType={masked ? 'password' : 'input'}
					id="password-input"
					on:input
					bind:inputValue={password}
				/>
			{:else if masked}
				<span id="password-masked-view">{mask}</span>
			{:else}
				<span id="password-view">{password}</span>
			{/if}
		</p>
		{#if password?.length}
			<ShowIcon
				{masked}
				on:click={() => (masked = !masked)}
				on:keypress={() => (masked = !masked)}
			/>
			<CopyIcon
				on:keypress={() => alert('copy')}
				on:click={() => {
					navigator.clipboard.writeText(password || '');
					alert(`copied ${password}`);
				}}
			/>
		{/if}
	</span>
</span>

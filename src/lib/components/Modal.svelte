<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Button from './Button.svelte';

	export let closeRoute: string | undefined = undefined;
	const dispatch = createEventDispatcher();
	const close = () => {
		closeRoute && goto(closeRoute);
		dispatch('close');
	};

	let modal: any;

	const handle_keydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable: Array<any> = Array.from(nodes).filter((n: any) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			(previously_focused as any).focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div
	class="fixed top-0 left-0 w-full h-full bg-slate-300 bg-opacity-80"
	on:click={close}
	on:keypress={close}
/>
<div
	class="flex flex-col justify-between overflow-y-auto w-11/12 h-5/6 rounded-lg fixed bg-white p-2 shadow-lg"
	role="dialog"
	aria-modal="true"
	bind:this={modal}
>
	<slot />
	<span class="w-100 flex justify-center items-end mb-2">
		<Button on:click={close} color="orange-500" text="CLOSE" />
	</span>
</div>

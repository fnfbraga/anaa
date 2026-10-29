<script lang="ts">
	import { cn } from '$lib/utils';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	export let open = true;
	export let titleId = 'dialog-title';
	export let descriptionId: string | undefined = undefined;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{ close: void }>();
	let dialogEl: HTMLDivElement | undefined;
	let previouslyFocused: HTMLElement | null = null;

	function close() {
		dispatch('close');
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
			return;
		}

		if (e.key === 'Tab' && dialogEl) {
			const focusable = Array.from(
				dialogEl.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
				)
			);
			if (focusable.length === 0) return;

			const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
			let nextIndex = 0;

			if (e.shiftKey) {
				nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
			} else {
				nextIndex = currentIndex === -1 || currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1;
			}

			focusable[nextIndex]?.focus();
			e.preventDefault();
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			previouslyFocused = document.activeElement as HTMLElement | null;
		}
	});

	onDestroy(() => {
		if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
			previouslyFocused.focus();
		}
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
		<!-- Backdrop -->
		<button
			type="button"
			tabindex="-1"
			aria-label="Close modal backdrop"
			class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-default"
			transition:fade={{ duration: 150 }}
			on:click={close}
		></button>

		<!-- Dialog Content -->
		<div
			bind:this={dialogEl}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			transition:scale={{ duration: 150, start: 0.96 }}
			class={cn(
				'relative z-50 flex flex-col w-full sm:max-w-lg max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-xl border bg-card text-card-foreground shadow-2xl focus:outline-none',
				className
			)}
		>
			<!-- Mobile drag handle indicator -->
			<div class="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-muted sm:hidden" aria-hidden="true"></div>

			<slot />
		</div>
	</div>
{/if}

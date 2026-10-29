<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { Dialog, DialogFooter } from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	export let closeRoute: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let showCloseFooter = true;

	const dispatch = createEventDispatcher();
	const close = () => {
		if (closeRoute) {
			goto(closeRoute);
		}
		dispatch('close');
	};
</script>

<Dialog open={true} on:close={close}>
	<div class="flex items-center justify-between px-6 pt-4 pb-3 border-b border-border/60">
		<div class="flex items-center gap-2 min-w-0">
			{#if title}
				<h2 id="dialog-title" class="text-lg font-semibold tracking-tight text-foreground truncate">
					{title}
				</h2>
			{:else}
				<span id="dialog-title" class="sr-only">Dialog</span>
			{/if}
			<slot name="header" />
		</div>
		<Button
			type="button"
			variant="ghost"
			size="icon"
			aria-label="Close modal"
			on:click={close}
			class="h-8 w-8 rounded-full -mr-1 text-muted-foreground hover:text-foreground"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-4 w-4"
				aria-hidden="true"
			>
				<path d="M18 6 6 18" />
				<path d="m6 6 12 12" />
			</svg>
		</Button>
	</div>

	<div class="flex-1 overflow-y-auto px-6 py-5">
		<slot />
	</div>

	{#if showCloseFooter}
		<DialogFooter class="sm:justify-between">
			<slot name="footer" />
			<Button type="button" variant="outline" on:click={close} class="w-full sm:w-auto">
				Close
			</Button>
		</DialogFooter>
	{/if}
</Dialog>

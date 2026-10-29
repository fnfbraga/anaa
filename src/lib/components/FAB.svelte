<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let open = false;

	function handleKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			open = false;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<button
		type="button"
		tabindex="-1"
		aria-label="Close quick add menu"
		transition:fade={{ duration: 150 }}
		on:click={() => (open = false)}
		class="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] cursor-default"
	></button>

	<ul
		role="menu"
		aria-label="Create new vault item"
		transition:fly={{ y: 16, duration: 180 }}
		class="fixed z-40 bottom-24 right-5 flex flex-col items-end gap-3"
	>
		<li role="none">
			<a
				href="/login/new"
				role="menuitem"
				on:click={() => (open = false)}
				class="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<span>New login</span>
				<span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
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
						<circle cx="7.5" cy="15.5" r="5.5" />
						<path d="m21 2-9.6 9.6" />
						<path d="m15.5 7.5 3 3L22 7l-3-3" />
					</svg>
				</span>
			</a>
		</li>
		<li role="none">
			<a
				href="/note/new"
				role="menuitem"
				on:click={() => (open = false)}
				class="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<span>New note</span>
				<span class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
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
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
						<polyline points="14 2 14 8 20 8" />
						<line x1="16" x2="8" y1="13" y2="13" />
						<line x1="16" x2="8" y1="17" y2="17" />
					</svg>
				</span>
			</a>
		</li>
	</ul>
{/if}

<button
	type="button"
	aria-label={open ? 'Close create menu' : 'Create new login or note'}
	aria-expanded={open}
	aria-haspopup="menu"
	on:click={() => (open = !open)}
	class="fixed z-40 bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all hover:bg-primary/90 hover:shadow-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.2"
		stroke="currentColor"
		class="h-6 w-6 transition-transform duration-200 {open ? 'rotate-45' : ''}"
		aria-hidden="true"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
	</svg>
</button>

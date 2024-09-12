<script lang="ts">
	export let tag: string | undefined | null;
	export let edit = false;
</script>

{#if tag}
	<span
		{...$$props}
		class="flex items-center whitespace-nowrap bg-sky-400 rounded-full mr-1 p-1 px-2 {!edit &&
			'mb-1'} "
	>
		<p class="text-xs pt-0.5">{tag}</p>
		{#if edit}
			<button on:click>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 ml-0.5  hover:bg-sky-300 rounded-full"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</button>
		{/if}
	</span>
{/if}

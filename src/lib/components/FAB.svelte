<script lang="ts">
	import { goto } from '$app/navigation';
	import HeaderButton from './HeaderButton.svelte';

	let open = false;
</script>

{#if open}
	<ul class="fixed z-90 bottom-32 right-16 bg-slate-100 p-8 rounded-lg">
		<li class="mb-8 cursor-pointer">
			<HeaderButton
				on:click={() => {
					goto('/login');
					open = false;
				}}>login</HeaderButton
			>
		</li>
		<li>
			<HeaderButton
				on:click={() => {
					goto('/note');
					open = false;
				}}>note</HeaderButton
			>
		</li>
	</ul>
{/if}

<svg
	on:click={() => (open = !open)}
	on:keypress={() => (open = !open)}
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="1.5"
	class="w-14 h-14 cursor-pointer fixed z-90 bottom-10 right-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-slate-100 hover:drop-shadow-2xl"
>
	{#if !open}
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke="#16a34a"
			d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	{:else}
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke="#f97316"
			d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	{/if}
</svg>

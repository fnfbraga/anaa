<script lang="ts">
	import { AlertEnum } from '$lib/models/misc';
	import { alerts } from '$lib/store';
	import { onMount } from 'svelte';

	const getColor = (type: AlertEnum) => {
		switch (type) {
			case AlertEnum.error:
				return 'bg-red-100 border border-red-400 text-red-700';
			case AlertEnum.warning:
				return 'bg-orange-100 border border-orange-400 text-orange-700';
			default:
				return 'bg-green-100 border border-green-400 text-green-700';
		}
	};

	const handleRemoveAlert = (alertIndex: number) => {
		alerts.update((alerts) => alerts.filter((_, i) => alertIndex !== i));
	};

	let time = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#each $alerts as alert, index}
	{#if alert && alert.createdOn + 3000 > time.getTime()}
		<div
			class="{getColor(alert.type)} bottom-10 fixed z-90 left-16 px-4 py-3 rounded mb-1"
			role="alert"
		>
			<strong class="font-bold mr-9">{alert?.message}{index}</strong>
			<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
				<svg
					class="fill-current h-6 w-6 {getColor(alert.type)}"
					on:click={() => handleRemoveAlert(index)}
					on:keypress={() => handleRemoveAlert(index)}
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><title>Close</title><path
						d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
					/></svg
				>
			</span>
		</div>
	{/if}
{/each}

<script lang="ts">
	import { AlertEnum } from '$lib/models/misc';
	import { alerts } from '$lib/store';
	import { Alert } from '$lib/components/ui/alert';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	const getVariant = (type: AlertEnum): 'default' | 'destructive' | 'warning' | 'success' => {
		switch (type) {
			case AlertEnum.error:
				return 'destructive';
			case AlertEnum.warning:
				return 'warning';
			default:
				return 'success';
		}
	};

	const handleRemoveAlert = (alertIndex: number) => {
		alerts.update((current) => current.filter((_, i) => alertIndex !== i));
	};

	let now = Date.now();

	onMount(() => {
		const interval = setInterval(() => {
			now = Date.now();
			alerts.update((current) =>
				current.filter((item) => item && item.createdOn + 3500 > now)
			);
		}, 500);

		return () => {
			clearInterval(interval);
		};
	});

	$: activeAlerts = $alerts.filter((item) => item && item.createdOn + 3500 > now);
</script>

<div
	aria-live="polite"
	aria-atomic="true"
	class="pointer-events-none fixed top-4 right-4 left-4 sm:left-auto sm:top-auto sm:bottom-6 sm:right-6 z-[100] flex flex-col gap-2 sm:w-full sm:max-w-sm"
>
	{#each activeAlerts as alert, index (alert.createdOn + '-' + index)}
		<div
			in:fly={{ y: -12, duration: 180 }}
			out:fade={{ duration: 150 }}
			class="pointer-events-auto shadow-lg rounded-lg bg-card"
		>
			<Alert variant={getVariant(alert.type)} class="flex items-center justify-between py-3 px-4 pr-3 shadow-md">
				<div class="flex items-center gap-2.5 min-w-0">
					{#if alert.type === AlertEnum.error}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 shrink-0"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
					{:else if alert.type === AlertEnum.warning}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 shrink-0"
							aria-hidden="true"
						>
							<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
							<path d="M12 9v4" />
							<path d="M12 17h.01" />
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4 shrink-0"
							aria-hidden="true"
						>
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
							<polyline points="22 4 12 14.01 9 11.01" />
						</svg>
					{/if}
					<span class="text-sm font-medium leading-snug truncate">{alert.message}</span>
				</div>
				<button
					type="button"
					aria-label="Dismiss notification"
					on:click={() => handleRemoveAlert(index)}
					class="ml-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
				</button>
			</Alert>
		</div>
	{/each}
</div>

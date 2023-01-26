<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoginScreen from '$lib/components/LoginScreen.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($page.data.session?.user) {
			if (browser) {
				goto('/');
			}
		}
	});
</script>

<LoginScreen loading={false} />

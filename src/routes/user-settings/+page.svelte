<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Modal closeRoute="/">
	<p class="p-2 ml-10">version: 1.1</p>
	User: {data.clientEmail}
</Modal>

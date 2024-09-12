<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/Modal.svelte';

	$: clientEmail = $page.data.clientEmail;
</script>

<Modal closeRoute="/">
	<p class="p-2 ml-10">version: 1.1</p>
	User: {clientEmail}
</Modal>

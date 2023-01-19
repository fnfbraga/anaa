<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createPopperActions } from 'svelte-popperjs';
	import HeaderButton from './HeaderButton.svelte';
	import { signOut } from '@auth/sveltekit/client';

	const [popperRef, popperContent] = createPopperActions({
		placement: 'bottom',
		strategy: 'fixed'
	});

	$: userData = $page.data.session?.user;

	let isOpen = false;
	$: userInitials = (userData?.name || '')
		.split(' ')
		.map((v) => v[0])
		.toString()
		.replace(',', '');
</script>

<button
	use:popperRef
	class="w-10 h-10 rounded-full {!userData?.image && 'bg-slate-400'} hover:shadow-lg"
	on:click={() => (isOpen = !isOpen)}
>
	{#if userData?.image}
		<img class="rounded-full" alt={userInitials} src={userData.image} referrerpolicy="no-referrer" />
	{:else}
		{userInitials}
	{/if}
</button>
{#if isOpen}
	<span id="menu-container" use:popperContent class="px-4 py-2 rounded shadow-xl bg-white">
		<ul>
			<li>
				<HeaderButton
					on:click={() => {
						goto('/user-settings');
						isOpen = false;
					}}>User Settings</HeaderButton
				>
			</li>
			<li>
				<HeaderButton
					on:click={() => {
						signOut();
						isOpen = false;
					}}>Logout</HeaderButton
				>
			</li>
		</ul>
	</span>
{/if}

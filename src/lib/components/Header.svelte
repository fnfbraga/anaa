<script lang="ts">
	import { filterState, searchState } from '$lib/store';
	import HeaderButton from './HeaderButton.svelte';
	import NavUserActions from './NavUserActions.svelte';
	let selected: 'logins' | 'notes' | undefined = undefined;

	const handleSelect = (value: 'logins' | 'notes') => {
		selected === value ? (selected = undefined) : (selected = value);
		filterState.set(selected);
	};

	const onSearchInput = (event: Event) => {
		event.preventDefault();
		searchState.set((event.target as any)?.value);
	};
</script>

<nav
	class="sticky top-0  shadow bg-white border-gray-400 px-2 sm:px-4 py-2.5 rounded flex justify-between w-full"
>
	<span class="flex align-middle justify-between space-x-3">
		<HeaderButton selected={selected === 'logins'} on:click={() => handleSelect('logins')}
			>logins</HeaderButton
		>
		<HeaderButton selected={selected === 'notes'} on:click={() => handleSelect('notes')}
			>notes</HeaderButton
		>
	</span>
	<div class="relative text-gray-600 focus-within:text-gray-400 ml-2 w-6/12">
		<span class="absolute inset-y-0 left-0 flex items-center pl-1">
			<button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
				<svg
					fill="none"
					stroke="black"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					class="w-5 h-5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg
				>
			</button>
		</span>
		<input
			type="search"
			name="search"
			class="w-11/12 py-2 text-white bg-gray-100 rounded-md pl-10 focus:outline-none text-gray-900"
			placeholder="Search..."
			autocomplete="off"
			on:input={onSearchInput}
		/>
	</div>
	<NavUserActions />
</nav>

<style>
	input[type='search']::-webkit-search-cancel-button {
		-webkit-appearance: none;
		height: 20px;
		width: 20px;
		margin-left: 0.4em;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
		cursor: pointer;
	}
</style>

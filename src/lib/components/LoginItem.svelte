<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Item } from '$lib/schema';
	import Name from './Name.svelte';
	import Password from './Password.svelte';
	import Tags from './Tags.svelte';
	import Url from './Url.svelte';
	import Username from './Username.svelte';

	export let login: Item;
</script>

<div class="flex m-1 space-x-4 w-full rounded shadow p-1 pl-8 hover:shadow-md">
	<span class="w-1/6 lg:w-2/12 p-2 cursor-pointer">
		<Name name={login.name} handleShowModal={() => goto(`/login/${login.id}`)} />
	</span>
	<span class="w-1/6 lg:w-2/12 p-2 font-mono hidden lg:block">
		<Url url={login.url || ''} />
	</span>
	<span class="w-1/6 lg:w-2/12 p-2">
		<Username username={login.username || ''} />
	</span>
	<span class="w-2/6 lg:w-3/12 p-2">
		<Password disabled password={login.password} isModal={false} />
	</span>
	<span class="w-[140px] justify-self-end lg:w-[140px] p-2 hidden sm:block">
		<Tags tags={login.tags} />
	</span>
</div>

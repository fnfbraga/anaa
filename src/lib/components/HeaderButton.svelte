<script lang="ts">
	export let selected = false;
</script>

<button
	on:click
	class="hover:border-b-stone-500 hover:border-b-2 hover:-mb-0.5 p-2 rounded-t-md {selected
		? 'border-b-stone-500 border-b-2 -mb-0.5 bg-slate-100'
		: ''}"
>
	<slot />
</button>

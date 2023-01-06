<script lang="ts">
	export let color = 'white';
	export let text: string;
</script>

<button on:click class="hover:border-b-{color} hover:border-b-2 -pb-4 hover:-mb-0.5 pb-2">
	<span class="hover:bg-stone-100 rounded-lg p-2.5 "> {text} </span>
</button>

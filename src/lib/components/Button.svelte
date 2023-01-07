<script lang="ts">
	export let color: string = 'white';
	export let text: string = '';
	export let disabled = false;
</script>

<button
	{disabled}
	on:click
	class={!disabled ? `hover:border-b-2 ${color} -pb-4 hover:-mb-0.5 pb-2` : ''}
>
	<span class={!disabled ? `hover:bg-stone-100 rounded-t-lg p-2.5` : 'text-gray-500'}>
		{text}
		<slot />
	</span>
</button>

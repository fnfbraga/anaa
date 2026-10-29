<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let selected = false;
	export let href: string | undefined = undefined;
</script>

<Button
	{href}
	variant={selected ? 'secondary' : 'ghost'}
	size="sm"
	aria-current={selected ? 'page' : undefined}
	on:click
	class={selected ? 'font-semibold bg-secondary text-secondary-foreground shadow-xs' : 'text-muted-foreground'}
>
	<slot />
</Button>

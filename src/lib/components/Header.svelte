<script lang="ts">
	import NavUserActions from './NavUserActions.svelte';
	import { TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';

	$: selected = $page.url.searchParams.get('type') as 'login' | 'note' | null;
	$: urlSearch = $page.url.searchParams.get('search') ?? '';

	let searchValue = $page.url.searchParams.get('search') ?? '';
	let lastUrlSearch = searchValue;
	let isInputFocused = false;
	let inputElement: HTMLInputElement | undefined;
	let debounceTimer: ReturnType<typeof setTimeout>;

	// Only sync from URL when URL search param changes externally (e.g. "Clear filters" button)
	// and never overwrite while the user is actively typing in the input.
	$: if (urlSearch !== lastUrlSearch) {
		lastUrlSearch = urlSearch;
		if (!isInputFocused) {
			searchValue = urlSearch;
		}
	}

	function buildFilterHref(value: 'login' | 'note' | null, currentUrl: URL) {
		const params = new URLSearchParams(currentUrl.searchParams);
		if (!value || params.get('type') === value) {
			params.delete('type');
		} else {
			params.set('type', value);
		}
		const query = params.toString();
		return query ? `/?${query}` : '/';
	}

	$: allHref = buildFilterHref(null, $page.url);
	$: loginHref = buildFilterHref('login', $page.url);
	$: noteHref = buildFilterHref('note', $page.url);

	function navigateWithSearch(value: string) {
		const params = new URLSearchParams($page.url.searchParams);
		const trimmed = value.trim();
		if (!trimmed) {
			params.delete('search');
		} else {
			params.set('search', trimmed);
		}
		lastUrlSearch = trimmed;
		const query = params.toString();
		goto(query ? `/?${query}` : '/', {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}

	function onSearchInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchValue = target.value;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			navigateWithSearch(searchValue);
		}, 250);
	}

	function handleSearchSubmit() {
		clearTimeout(debounceTimer);
		navigateWithSearch(searchValue);
	}

	function clearSearch() {
		clearTimeout(debounceTimer);
		searchValue = '';
		navigateWithSearch('');
		inputElement?.focus();
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (
			(event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) &&
			document.activeElement?.tagName !== 'INPUT' &&
			document.activeElement?.tagName !== 'TEXTAREA'
		) {
			event.preventDefault();
			inputElement?.focus();
		}
	}
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

<header class="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
	<div class="container mx-auto max-w-5xl px-3 sm:px-6 py-2.5 space-y-2.5">
		<!-- Top Row: Brand, Search, Actions -->
		<div class="flex items-center justify-between gap-2.5">
			<a
				href="/"
				aria-label="ANAA Vault Home"
				class="inline-flex items-center gap-2 rounded-lg py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
			>
				<span
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs"
					aria-hidden="true"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-5 w-5"
					>
						<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
						<path d="M7 11V7a5 5 0 0 1 10 0v4" />
					</svg>
				</span>
				<div class="flex flex-col">
					<span class="text-base font-bold tracking-tight leading-none text-foreground">ANAA</span>
					<span class="text-[11px] text-muted-foreground hidden sm:inline leading-tight">
						Secure Vault
					</span>
				</div>
			</a>

			<!-- Search Form -->
			<form
				method="GET"
				action="/"
				role="search"
				aria-label="Search vault items"
				class="relative flex-1 max-w-md"
				on:submit|preventDefault={handleSearchSubmit}
			>
				{#if selected}
					<input type="hidden" name="type" value={selected} />
				{/if}
				<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
					{#if $navigating && $navigating.to?.url.pathname === '/'}
						<span
							class="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
							aria-hidden="true"
						></span>
					{:else}
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							class="w-4 h-4"
							aria-hidden="true"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					{/if}
				</span>
				<input
					type="text"
					inputmode="search"
					enterkeyhint="search"
					name="search"
					aria-label="Search logins and notes"
					class="flex h-10 w-full rounded-xl border border-input bg-muted/50 pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					placeholder="Search vault..."
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					bind:this={inputElement}
					bind:value={searchValue}
					on:focus={() => (isInputFocused = true)}
					on:blur={() => {
						isInputFocused = false;
					}}
					on:input={onSearchInput}
				/>
				{#if searchValue}
					<button
						type="button"
						aria-label="Clear search"
						on:mousedown|preventDefault
						on:click={clearSearch}
						class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground focus-visible:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="m15 9-6 6" />
							<path d="m9 9 6 6" />
						</svg>
					</button>
				{:else}
					<kbd
						class="pointer-events-none absolute right-2.5 top-2.5 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
						aria-hidden="true"
					>
						/
					</kbd>
				{/if}
			</form>

			<!-- Desktop Quick Add + User Menu -->
			<div class="flex items-center gap-2 shrink-0">
				<div class="hidden md:flex items-center gap-1.5">
					<Button href="/login/new" size="sm" variant="default" class="h-9">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4"
							aria-hidden="true"
						>
							<path d="M5 12h14" />
							<path d="M12 5v14" />
						</svg>
						<span>New Login</span>
					</Button>
					<Button href="/note/new" size="sm" variant="outline" class="h-9">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-4 w-4"
							aria-hidden="true"
						>
							<path d="M5 12h14" />
							<path d="M12 5v14" />
						</svg>
						<span>New Note</span>
					</Button>
				</div>
				<NavUserActions />
			</div>
		</div>

		<!-- Filter Tabs Row -->
		<nav aria-label="Filter vault items" class="flex items-center">
			<TabsList class="w-full sm:w-auto grid grid-cols-3 sm:inline-flex h-10">
				<TabsTrigger href={allHref} active={!selected}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-3.5 w-3.5"
						aria-hidden="true"
					>
						<rect width="7" height="7" x="3" y="3" rx="1" />
						<rect width="7" height="7" x="14" y="3" rx="1" />
						<rect width="7" height="7" x="14" y="14" rx="1" />
						<rect width="7" height="7" x="3" y="14" rx="1" />
					</svg>
					<span>All</span>
				</TabsTrigger>
				<TabsTrigger href={loginHref} active={selected === 'login'}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-3.5 w-3.5"
						aria-hidden="true"
					>
						<circle cx="7.5" cy="15.5" r="5.5" />
						<path d="m21 2-9.6 9.6" />
						<path d="m15.5 7.5 3 3L22 7l-3-3" />
					</svg>
					<span>logins</span>
				</TabsTrigger>
				<TabsTrigger href={noteHref} active={selected === 'note'}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-3.5 w-3.5"
						aria-hidden="true"
					>
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
						<polyline points="14 2 14 8 20 8" />
						<line x1="16" x2="8" y1="13" y2="13" />
						<line x1="16" x2="8" y1="17" y2="17" />
						<line x1="10" x2="8" y1="9" y2="9" />
					</svg>
					<span>notes</span>
				</TabsTrigger>
			</TabsList>
		</nav>
	</div>
</header>

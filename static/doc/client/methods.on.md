

## Usage

### `change` event

```svelte
<script>
    let element
    table.on('change', () => element.scrollTop = 0)
</script>

<div bind:this={element} style:height="600px">
    {#each table.rows as row}
        [...]
    {/each}
</div>
```

### `clearFilters` event

```svelte
<script>
    let value = $state('')
    table.on('clearFilters', () => value = '')
</script>

<input type="text" oninput={() => table.filter(value, 'columnName')}/>
```

### `clearSearch` event

```svelte
<script>
    let value = $state('')
    table.on('clearSearch', () => value = '')
</script>

<input type="text" oninput={() => table.search(value)}/>
```
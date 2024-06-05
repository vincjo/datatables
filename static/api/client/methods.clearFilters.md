Remove all filters.

## Usage
```svelte
<button onclick={() => table.clearFilters()}>
    Clear filters
</button>
```
<br> 

🚨 Remember to delete the text-inputs values ​​using `on('clearFilters', callback)` at the filter declaration level.

```svelte
<script>
    let value = $state('')
    table.on('clearFilters', () => value = '')
</script>

<input type="text" bind:value oninput={() => table.filter(value, 'email')}>
```
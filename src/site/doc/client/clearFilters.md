Remove all filters.

## Usage
```svelte
<button on:click={() => handler.clearFilters()}>
    Clear filters
</button>
```
<br> 

🚨 Remember to delete the text-inputs values ​​using `on('clearFilters', callback)` at the filter declaration level.
```svelte
<script>
    let value = ''
    handler.on('clearFilters', () => value = '')
</script>

<input type="text" bind:value on:input={() => handler.filter(value, 'email')}>
```
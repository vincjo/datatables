
This method allows you to create a search function on a sample of objects. For example, to filter a list of distinct values.

## Usage
```svelte
<script>
    const sampleList = [
        {value: 'High', count: 200},
        {value: 'Low', count: 15},
        {value: 'Medium', count: 54},
    ]
    const search = table.createSearch(sampleList)
</script>

<input type="text" bind:value={search.value}>
<ul>
    {#each search.items as item}
        <li>{item.value} - {item.count}</li>
    {/each}
</ul>
```
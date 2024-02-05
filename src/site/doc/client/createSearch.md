
This method allows you to create a search function on a sample of objects. For example, to filter a list of distinct values.

## Usage
```svelte
<script>
    const sampleList = [
        {value: 'High', count: 200},
        {value: 'Low', count: 15},
        {value: 'Medium', count: 54},
    ]
    const search = handler.createSearch(sampleList)
    const items = search.get()
    let value = ''
</script>

<input type="text" bind:value on:input={() => search.set(value)}>
<ul>
    {#each $items as item}
        <li>{item.value} - {item.count}</li>
    {/each}
</ul>
```
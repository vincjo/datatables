
This method allows you to create a filter function on a sample of objects. For example, on a list of distinct values.

## Usage
```svelte
<script>
    const distinctValues = [
        {value: 'High', count: 200},
        {value: 'Low', count: 15},
        {value: 'Medium', count: 54},
    ]
    const filter = table.createRecordFilter(distinctValues)
</script>

<input type="text" bind:value={filter.value}>
<ul>
    {#each filter.records as record}
        <li>{record.value} - {record.count}</li>
    {/each}
</ul>
```
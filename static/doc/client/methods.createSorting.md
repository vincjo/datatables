Create a new sort for 1 column. It replaces `sort()`.


## Usage
```svelte
<script lang="ts">
    const sorting = table.createSorting('last_name')
</script>

<th class="sortable" class:active={sorting.isActive}>
    <button onclick={() => sorting.set()}>
        Last name
        <span 
            class:asc={sorting.direction === 'asc'} 
            class:desc={sorting.direction === 'desc'}>
        </span>
    </button>
</th>
```

## Working with nested props

```ts
const filter = table.createSorting((row) => row.nested.prop)
```


Apply a filter to one or more columns.

This method is a shortcut and may be more limiting than `createFilter()` in some cases.

## Usage
```svelte
<script>
    import { check, type TableHandler } from '@vincjo/datatables'

    let { table }: { table: TableHandler } = $props()

    let value = ''
    table.on('clearFilters', () => value = '')
</script>

<input type="text" bind:value oninput={() => table.filter(21, 'age', check.isGreaterThan)}/>
```

## Working with nested props

```ts
table.filter(21, (row) => row.user.age, check.isGreaterThan)
```
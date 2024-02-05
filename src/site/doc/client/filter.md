
Apply a filter to one or more columns.

This method is a shortcut and may be more limiting than `createFilter()` in some cases.

## Usage
```svelte
<script>
    import { check } from '@vincjo/datatables'
    export let handler

    let value = ''

    handler.on('clearFilters', () => value = '')
</script>

<input type="text" bind:value on:input={() => handler.filter(21, 'age', check.isGreaterThan)}/>
```

## Working with nested props

```ts
handler.filter(21, (row) => row.user.age, check.isGreaterThan)
```
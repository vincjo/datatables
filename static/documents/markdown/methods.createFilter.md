Create a new column filter.


## Usage
```ts
const filter = table.createFilter('last_name')
```
```svelte
<input type="text" bind:value={filter.value} oninput={() => filter.set()}>
```

## Working with nested props

```ts
const filter = table.createFilter((row) => row.nested.prop)
```

## Providing check param (client-side data processing only)
```svelte
<script lang="ts">
    import { check } from '@vincjo/datatables'

    const filter = table.createFilter('login_count', check.isEqualTo)
</script>
```
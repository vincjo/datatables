Create a new filter for 1 column. `createFilter` replaces `filter()`.


## Usage
```svelte
<script lang="ts">
    const filter = table.createFilter('last_name')
</script>

<input type="text" bind:value={filter.value} oninput={() => filter.set()}>
```

## Working with nested props

```ts
const filter = table.createFilter((row) => row.nested.prop)
```

## Providing check param
```svelte
<script lang="ts">
    import { check } from '@vincjo/datatables'

    const filter = table.createFilter('login_count', check.isEqualTo)
</script>
```


Returns paginated and filtered rows as a derived store

## Usage

```svelte
<script lang="ts">
    import { DataHandler } from '@vincjo/datatables'
    import { someData } from './somewhere'

    const handler = new DataHandler(someData, { rowsPerPage: 50 })

    const rows = handler.getRows()
</script>

<ul>
    {#each $rows as row}
        <li>{row.first_name} {row.last_name}</li>
    {/each}
</ul>
```

## Return

```ts
$rows = [
    { id: 1, frist_name: 'Jane', last_name: 'Doe' },
    ...
    { id: 150, first_name: 'John', last_name: 'Doe' }
]
```
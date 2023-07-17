

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
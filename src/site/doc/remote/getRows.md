

Return rows as a writable store for the current page.

## Usage

```svelte
<script lang="ts">
    import { DataHandler } from '@vincjo/datatables/remote'

    const handler = new DataHandler([], { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>

<ul>
    {#each $rows as row}
        <li>{row.first_name} {row.last_name}</li>
    {/each}
</ul>
```

## Output

```ts
$rows = [
    { id: 1, frist_name: 'Jane', last_name: 'Doe' },
    ...
    { id: 150, first_name: 'John', last_name: 'Doe' }
]
```
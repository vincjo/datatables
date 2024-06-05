
## Usage


```svelte
<script>
    const { start, end, total, selected } = $derived(table.rowCount)
</script>

<!-- Pagination -->
<p>
    Showing <b>{start}</b> 
    to <b>{end}</b> 
    of <b>{total}</b> entries
</p>

<!-- Selection -->
<p>{selected} of {total} row(s) selected</p>
```

## Output

```ts
const table.rowCount = {
    start: 1,
    end: 10,
    total: 150,
    selected: 0
}
// rowsPerPage = 10, dataset has 150 rows, no filter applied, no selected row
```

## Usage


```svelte
<script>
    const rowCount = handler.getRowCount()
</script>

<!-- Pagination -->
<p>
    Showing <b>{$rowCount.start}</b> 
    to <b>{$rowCount.end}</b> 
    of <b>{$rowCount.total}</b> entries
</p>

<!-- Selection -->
<p>{$rowCount.selected} of {$rowCount.total} row(s) selected</p>
```

## Output

```ts
const $rowCount = {
    start: 1,
    end: 10,
    total: 150,
    selected: 0
}
// rowsPerPage = 10, dataset has 150 rows, no filter applied, no selected row
```
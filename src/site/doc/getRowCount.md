
## Usage


```svelte
<script>
    const rowCount = handler.getRowCount()
</script>

<p>
    Showing <b>{$rowCount.start}</b> 
    to <b>{$rowCount.end}</b> 
    of <b>{$rowCount.total}</b> entries
</p>
```

## Return

```ts
const $rowCount = {
    start: 1,
    end: 10,
    total: 150
}
// rowsPerPage = 10, dataset has 150 rows, no filter applied
```
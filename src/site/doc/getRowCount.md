
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
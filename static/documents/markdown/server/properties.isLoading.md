`isLoading` is true while `invalidate()` runs.

## Usage


```svelte
<Datatable {table}>
    <div class="spinner" class:active={table.isLoading}></div>
    <table>
        [...]
    </table>
</Datatable>
```
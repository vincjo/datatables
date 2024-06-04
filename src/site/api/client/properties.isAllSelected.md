

## Usage

```svelte

<input
    type="checkbox"
    checked={table.isAllSelected}
    onclick={() => table.selectAll({ scope: 'currentPage' })}
/>
```
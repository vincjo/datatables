Get selected rows to check if an element is active.

## Usage

```svelte
<tr class:active={table.selected.includes(row.id)}>
    <td>{row.id}</td>
    <td>{row.last_name}</td>
</tr>
```
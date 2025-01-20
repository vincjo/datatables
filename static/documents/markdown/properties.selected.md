Get selected rows by identifier.

## Usage

```svelte
<tr class={{ active: table.selected.includes(row.id) }}>
    <td>
        <input type="checkbox" 
            checked={table.selected.includes(row.id)}
            onclick={() => table.select(row.id)}
        >
    </td>
    <td>{row.first_name}</td>
    <td>{row.last_name}</td>
</tr>
```
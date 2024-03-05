

## Usage

```svelte
<script>
    const selected = handler.getSelected()
</script>

<tr class:selected={$selected.includes(row.id)}>
    <td>{row.id}</td>
    <td>{row.last_name}</td>
</tr>
```
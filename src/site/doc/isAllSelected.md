

## Usage

```svelte
<script>
    const isAllSelected = handler.isAllSelected()
</script>

<input
    type="checkbox"
    checked={$isAllSelected}
    on:click={() => handler.selectAll({ selectBy: 'id' })}
/>
```
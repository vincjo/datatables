

## Usage

```svelte
<script>
    const isAllSelected = handler.getIsAllSelected()
</script>

<input
    type="checkbox"
    checked={$isAllSelected}
    on:click={() => handler.selectAll({ scope: 'currentPage' })}
/>
```


## Usage

```svelte
<script lang="ts">
    let element: HTMLElement
    table.on('change', () => element.scrollTop = 0)
</script>

<div bind:this={element} style:height="600px">
    {#each table.rows as row}
        [...]
    {/each}
</div>
```

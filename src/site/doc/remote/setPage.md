

## Usage

```svelte
<script>
    const pages = handler.getPages()
    const pageCount = handler.getPageCount()
</script>

<button on:click={() => handler.setPage(1)}>
    First page
</button>

<button on:click={() => handler.setPage('previous')}>
    Previous
</button>

{#each $pages as page}
    <button on:click={() => handler.setPage(page)}>
        {page}
    </button>
{/each}

<button on:click={() => handler.setPage('next')}>
    Next
</button>

<button on:click={() => handler.setPage($pageCount)}>
    Last page
</button>
```

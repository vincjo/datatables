Table navigation.

## Usage

```svelte

<button onclick={() => table.setPage(1)}>
    First page
</button>

<button onclick={() => table.setPage('previous')}>
    Previous
</button>

{#each table.pagesWithEllipsis as page}
    <button onclick={() => table.setPage(page)}>
        {page}
    </button>
{/each}

<button onclick={() => table.setPage('next')}>
    Next
</button>

<button onclick={() => table.setPage(table.pageCount)}>
    Last page
</button>
```

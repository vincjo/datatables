Table navigation.

## Usage

```ts
table.setPage(5)            // Go to any page number
table.setPage('previous')   // Go to the previous page
table.setPage('next')       // Go to the next page
table.setPage('last')       // Go to the last page
```

```svelte
<button onclick={() => table.setPage(1)}>
    First page
</button>

<button onclick={() => table.setPage('previous')}>
    Previous
</button>

{#each table.pagesWithEllipsis as page}
    <button onclick={() => table.setPage(page)}>
        {page ?? '...'}
    </button>
{/each}

<button onclick={() => table.setPage('next')}>
    Next
</button>

<button onclick={() => table.setPage('last')}>
    Last page
</button>
```

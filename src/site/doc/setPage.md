

## Usage

```svelte
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
```

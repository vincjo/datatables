<script lang="ts">
    import { TableHandler } from '$lib/src/client'
    import data from '$site/data/data'
    const table = new TableHandler(data, { rowsPerPage: 10 })
    table.setPage(12)
</script>

<aside class="bg-darken">
    {#each table.pagesWithEllipsis as page}
        <button class={{ active: page === table.currentPage }} onclick={() => table.setPage(page)}>
            {page ?? '...'}
        </button>
    {/each}
</aside>


<style>
    button {
        height: 32px;
        width: 32px;
        background: var(--grey);
        color: var(--font);
        margin: 0 2px;
        border: 3px solid transparent;
        transition: all, 0.2s;
    }
    button:hover {
        background: var(--grey-lighten);
    }
    aside {
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 24px;
    }
    button.active {
        background: var(--secondary);
        color: #eee;
        font-weight: bold;
    }
</style>
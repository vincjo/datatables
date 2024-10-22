<script lang="ts">
    import { TableHandler } from '$lib/src/server'
    import data from '$site/data/data'
    const table = new TableHandler(data, { rowsPerPage: 10, totalRows: 150 })
    table.setPage(5)
</script>


<aside class="bg-darken">
    <button class="nav" onclick={() => table.setPage(1)}>&#8676; <span>First page</span></button>
    <button class="nav" onclick={() => table.setPage('previous')}>&larr; <span>Previous</span></button>
    {#each table.pagesWithEllipsis as page}
        <button class:active={page === table.currentPage} onclick={() => table.setPage(page)}>
            {page ?? '...'}
        </button>
    {/each}
    <button class="nav" onclick={() => table.setPage('next')}><span>Next</span> &rarr;</button>
    <button class="nav" onclick={() => table.setPage('last')}><span>Last page</span> &#8677;</button>
</aside>


<style>
    button {
        width: 32px;
        height: 32px;
        background: var(--grey);
        color: var(--font);
        margin: 2px;
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
        background: var(--secondary-darken);
        color: #eee;
        font-weight: bold;
    }
    button.nav {
        width: fit-content;
        padding: 0 4px;
        margin: 0;
        background: var(--primary);
        color: #eee;
    }
    button.nav:hover {
        background: var(--primary-darken);
    }
    @media (max-width: 600px) {
        button span {
            display: none;
        }
        button {
            width: 22px;
        }
        aside {
            padding: 8px 4px;
        }
    }
</style>
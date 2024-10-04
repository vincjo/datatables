<script lang="ts">
    import type { TableHandlerInterface } from '$lib/src/shared'
    type T = $$Generic<Row>
    let { table }: { table: TableHandlerInterface<T> } = $props()
</script>

<section>
    {#if table.pages === undefined}
        {@render nopage()}
    {:else if table.clientWidth < 600}
        {@render small()}
    {:else}
        {@render ellipsis()}
    {/if}
</section>



{#snippet nopage()}
    <button type="button" class="small" class:disabled={table.currentPage === 1} onclick={() => table.setPage('previous')}>
        &#10094;
    </button>
    <button type="button" class="page">Page <b>{table.currentPage}</b></button>
    <button type="button" class="small" onclick={() => table.setPage('next')}>
        &#10095;
    </button>
{/snippet}



{#snippet small()}
    <button type="button" class="small" class:disabled={table.currentPage === 1} onclick={() => table.setPage(1)}>
        &#10092;&#10092;
    </button>
    <button type="button" class:disabled={table.currentPage === 1} onclick={() => table.setPage('previous')}>
        &#10094;
    </button>
    <button type="button" class:disabled={table.currentPage === table.pageCount} onclick={() => table.setPage('next')}>
        &#10095;
    </button>
    <button type="button" class="small" class:disabled={table.currentPage === table.pageCount} onclick={() => table.setPage('last')}>
        &#10093;&#10093;
    </button>
{/snippet}



{#snippet ellipsis()}
    <button type="button" class:disabled={table.currentPage === 1} onclick={() => table.setPage('previous')}>
        {@html table.i18n.previous}
    </button>
    {#each table.pagesWithEllipsis as page}
        <button type="button"
            class="bg-darken-active"
            class:active={table.currentPage === page}
            class:ellipse={page === null}
            onclick={() => table.setPage(page)}
        >
            {page ?? '...'}
        </button>
    {/each}
    <button type="button" class:disabled={table.currentPage === table.pageCount} onclick={() => table.setPage('next')}>
        {@html table.i18n.next}
    </button>
{/snippet}


<style>
    section {
        display: flex;
        margin: 8px 16px;
    }
    button {
        background: inherit;
        height: 32px;
        width: 32px;
        color: var(--font-grey, #9e9e9e);
        cursor: pointer;
        font-size: 13px;
        margin: 0;
        padding: 0;
        transition: all, 0.2s;
        line-height: 32px;
        border: 1px solid var(--grey, #e0e0e0);
        border-right: none;
        border-radius: 0;
        outline: none;
    }
    button:first-child {
        border-radius: 4px 0 0 4px;
    }
    button:last-child {
        border-right: 1px solid var(--grey, #e0e0e0);
        border-radius: 0 4px 4px 0;
    }

    button:first-child:not(.small),
    button:last-child:not(.small) {
        min-width: 72px;
    }

    button:not(.active):hover {
        background: var(--grey-lighten, #eee);
    }
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }
    button.active {
        background: var(--grey-lighten, #eee);
        font-weight: bold;
        color: var(--font, #424242);
        cursor: default;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
    button.page {
        width: 80px;
    }
</style>

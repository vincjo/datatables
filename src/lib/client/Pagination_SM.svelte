<script lang="ts">
    import type { TableHandler, Row } from '$lib/client'
    type T = $$Generic<Row>
    type Props = { table: TableHandler<T> }

    let { table }: Props = $props()
</script>


<button
    type="button"
    class="small"
    class:disabled={table.currentPage === 1}
    onclick={() => table.setPage(1)}
>
&#10092;&#10092;
</button>
<button
    type="button"
    class:disabled={table.currentPage === 1}
    onclick={() => table.setPage('previous')}
>
&#10094;
</button>
<button
    class:disabled={table.currentPage === table.pageCount}
    onclick={() => table.setPage('next')}
>
&#10095;
</button>
<button
    class="small"
    class:disabled={table.currentPage === table.pageCount}
    onclick={() => table.setPage(table.pageCount)}
>
&#10093;&#10093;
</button>

<style>
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
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
</style>
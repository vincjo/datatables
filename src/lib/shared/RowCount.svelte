<script lang="ts">
    import type { TableHandlerLike } from '$lib/shared'

    type T = $$Generic<Row>
    let { table, selection = false }: { table: TableHandlerLike<T>, selection?: boolean } = $props()

    const { start, end, total, selected } = $derived(table.rowCount)
</script>

<aside>
    {#if selection}
        <b>{selected}</b>
        {#if total}
            of <b>{total}</b>
        {/if}
        row(s) selected.
        {#if selected > 0}
            <button onclick={() => table.clearSelection()}>❌ Clear</button>
        {/if}
    {:else}
        {#if table.clientWidth < 640}
            {#if total > 0}
                <b>{start}</b>-
                <b>{end}</b>/
                <b>{total}</b>
            {:else}
                {table.i18n.noRows}
            {/if}
        {:else if total > 0}
            {@html table.i18n.rowCount
                .replace('{start}', `<b>${start}</b>`)
                .replace('{end}', `<b>${end}</b>`)
                .replace('{total}', `<b>${total}</b>`)}
        {:else}
            {table.i18n.noRows}
        {/if}
    {/if}
</aside>

<style>
    aside {
        margin: 8px 16px;
        color: var(--font-grey, #757575);
        line-height: 32px;
        font-size: 14px;
    }
</style>

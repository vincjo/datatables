<script lang="ts">
    import type { TableHandlerInterface } from '$lib/src/shared'

    type T = $$Generic<Row>
    let { table, selection = false }: { table: TableHandlerInterface<T>, selection?: boolean } = $props()

    const { start, end, total, selected } = $derived(table.rowCount)
</script>

<aside>
    {#if selection}
        {@render selectedRows()}
    {:else if table.clientWidth < 640}
        {@render small()}
    {:else}
        {@render rowCount()}
    {/if}
</aside>



{#snippet selectedRows()}
    <b>{selected}</b>
    {#if total}
        of <b>{total}</b>
    {/if}
    row(s) selected.
    {#if selected > 0}
        <button type="button" onclick={() => table.clearSelection()}>❌ Clear</button>
    {/if}
{/snippet}



{#snippet small()}
    {#if total > 0}
        <b>{start}</b>-
        <b>{end}</b>/
        <b>{total}</b>
    {:else}
        {table.i18n.noRows}
    {/if}
{/snippet}



{#snippet rowCount()}
    {#if total > 0}
        {@html table.i18n.rowCount
            .replace('{start}', `<b>${start}</b>`)
            .replace('{end}', `<b>${end}</b>`)
            .replace('{total}', `<b>${total}</b>`)}
    {:else}
        {table.i18n.noRows}
    {/if}
{/snippet}



<style>
    aside {
        margin: 8px 16px;
        color: var(--font-grey, #757575);
        line-height: 32px;
        font-size: 14px;
    }
</style>

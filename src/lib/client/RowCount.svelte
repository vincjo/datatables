<script lang="ts">
    import type { TableHandler, Row } from '$lib/client'

    type T = $$Generic<Row>
    type Props = { table: TableHandler<T>, small: boolean }

    let { table, small = false }: Props = $props()
    const { start, end, total } = $derived(table.rowCount)
</script>

<aside>
    {#if small}
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
</aside>

<style>
    aside {
        margin: 8px 16px;
        color: var(--font-grey, #757575);
        line-height: 32px;
        font-size: 14px;
    }
</style>

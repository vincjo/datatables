<script lang="ts">
    import type { TableHandler } from '$lib/remote'

    type Props = {
        table: TableHandler,
        small?: boolean
    }
    let { table, small = false }: Props = $props()
    const { total, start, end } = $derived(table.rowCount)
</script>

{#if start === undefined}
    <div></div>
{:else}
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
                .replace('{end}',   `<b>${end}</b>`)
                .replace('{total}', `<b>${total}</b>`)}
        {:else}
            {table.i18n.noRows}
        {/if}
    </aside>
{/if}


<style>
    aside {
        margin: 8px 16px;
        color: var(--font-grey, #757575);
        line-height: 32px;
        font-size: 14px;
    }
</style>

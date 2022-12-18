<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler
    export let i18n = {} as { noRows: string; rowCount: string }



    export let small = false
    const rowCount = handler.getRowCount()

    const rowCountLabel = i18n.rowCount ?? 'Showing {start} to {end} of {total} entries'
    $: label = rowCountLabel
		.replace('{start}', `<b>${$rowCount.start}</b>`)
		.replace('{end}', `<b>${$rowCount.end}</b>`)
		.replace('{total}', `<b>${$rowCount.total}</b>`)
</script>


{#if small}
    {#if $rowCount.total > 0}
        <aside>
            <b>{$rowCount.start}</b>-
            <b>{$rowCount.end}</b>/
            <b>{$rowCount.total}</b>
        </aside>
    {:else}
        {i18n.noRows ?? 'No entries to found'}
    {/if}
{:else}
    <aside>
        {#if $rowCount.total > 0}
            {@html label}
        {:else}
            {i18n.noRows ?? 'No entries to found'}
        {/if}
    </aside>
{/if}




<style>
    aside{
        color:#616161;
        line-height:32px;
        margin-left:16px;
        font-size:14px;
    }
</style>

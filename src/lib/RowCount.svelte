<script lang="ts">
    import type { DataHandler } from '$lib/core'
    export let handler: DataHandler
    export let i18n = { 
        noRows: 'No entries to found', 
        rowCount: 'Showing {start} to {end} of {total} entries' 
    }
    export let small = false

    const rowCount = handler.getRowCount()
</script>


{#if small}
    {#if $rowCount.total > 0}
        <aside>
            <b>{$rowCount.start}</b>-
            <b>{$rowCount.end}</b>/
            <b>{$rowCount.total}</b>
        </aside>
    {:else}
        {i18n.noRows}
    {/if}
{:else}
    <aside>
        {#if $rowCount.total > 0}
            {@html i18n.rowCount
                .replace('{start}', `<b>${$rowCount.start}</b>`)
                .replace('{end}', `<b>${$rowCount.end}</b>`)
                .replace('{total}', `<b>${$rowCount.total}</b>`)
            }
        {:else}
            {i18n.noRows}
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

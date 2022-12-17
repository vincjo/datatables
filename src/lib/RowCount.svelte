<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler

    export let small = false
    const rowCount = handler.getRowCount()
</script>


{#if small}
    <aside>
        <b>{$rowCount.start}</b>-
        <b>{$rowCount.end}</b>/
        <b>{$rowCount.total}</b>
    </aside>
{:else}
    <aside>
        {#if $rowCount.total > 0}
            Showing <b>{$rowCount.start}</b> 
            to <b>{$rowCount.end}</b> 
            of <b>{$rowCount.total}</b> entries
        {:else}
            No entries to found
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

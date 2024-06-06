<script lang="ts">
    import type { DataHandler } from '$lib/local'
    export let handler: DataHandler
    const rowCount = handler.getRowCount()
</script>

<aside>
    {#if $rowCount.total > 0}
        Showing <b>{$rowCount.start}</b>
        to <b>{$rowCount.end}</b>
        of <b>{$rowCount.total}</b>
    {:else}
        No entries found
    {/if}
</aside>

<style>
    aside {
        color: #616161;
        line-height: 32px;
        font-size: 14px;
    }
</style>

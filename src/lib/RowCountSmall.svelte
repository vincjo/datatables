<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler

    const rowCount = handler.getRowCount()
</script>


<aside>
    <b>{$rowCount.start}</b>-
    <b>{$rowCount.end}</b>/
    <b>{$rowCount.total}</b>
</aside>


<style>
    aside{
        color:#616161;
        line-height:32px;
        margin-left:16px;
        font-size:14px;
    }
</style>

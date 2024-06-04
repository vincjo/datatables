<script lang="ts">
    import type { DataHandler } from '$lib'
    export let handler: DataHandler
    const rowCount = handler.getRowCount()
</script>

<div class="flex">
    <span>
        {$rowCount.selected} of {$rowCount.total} row(s) selected.
    </span>
    {#if $rowCount.selected > 0}
        <button class="flex" on:click={() => handler.clearSelection()}>
            Reset
            <i class="micon">clear</i>
        </button>
    {/if}
</div>

<style>
    span {
        color: #616161;
        font-size: 14px;
    }
    button {
        padding: 0 8px;
        height: 32px;
        margin: 0 8px;
        border-radius: 4px;
        border: 1px solid #f5f5f5;
        background: #f5f5f5;
    }
    button:hover {
        background: #eee;
    }
    i {
        font-size: 18px;
        margin-left: 8px;
    }
</style>
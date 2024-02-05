<script lang="ts">
    import type { DataHandler } from '$lib'
    export let handler: DataHandler
    const selected = handler.getSelectedCount()
</script>

<div class="flex">
    <span>
        {$selected.count} of {$selected.total} row(s) selected.
    </span>
    {#if $selected.count > 0}
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
    }
    button:hover {
        background: #f5f5f5;
    }
    i {
        font-size: 18px;
        margin-left: 8px;
    }
</style>
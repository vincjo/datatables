<script lang="ts">
    import type { DataHandler, Row } from '$lib/remote'

    type T = $$Generic<Row>

    export let handler
    const selectedCount = handler.getSelectedCount()
</script>


<aside class={$$props.class ?? ''}>

    <b>{$selectedCount.count}</b> 
    {#if $selectedCount.total}
        of <b>{$selectedCount.total}</b>
    {/if}
    row(s) selected.
    {#if $selectedCount.count > 0}
        <button on:click={() => handler.clearSelection()}>❌ Clear</button>
    {/if}
</aside>


<style>
    aside {
        color: #616161;
        line-height: 32px;
        font-size: 14px;
    }
    button {
        background: #fafafa;
        padding: 2px 4px;
        border-radius: 2px;
        cursor: pointer;
        border: 1px solid #e0e0e0;
    }
</style>

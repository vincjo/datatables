<script lang="ts">
    import type { TableHandler } from '$lib/remote'

    let { table }: { table: TableHandler } = $props()
    const { selected, total } = $derived(table.rowCount)
</script>


<aside>
    <b>{selected}</b> 
    {#if total}
        of <b>{total}</b>
    {/if}
    row(s) selected.
    {#if selected > 0}
        <button onclick={() => table.clearSelection()}>❌ Clear</button>
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

<script lang="ts">
    import type { TableHandler } from '$lib'
    type Props = { table: TableHandler }
    let { table }: Props = $props()
    const { selected, total } = $derived(table.rowCount)
</script>

<div class="flex">
    <span>
        {selected} of {total} row(s) selected.
    </span>
    {#if selected > 0}
        <button class="flex" onclick={() => table.clearSelection()}>
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
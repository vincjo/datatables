<script lang="ts">
    import type { TableHandler } from '$lib'
    let { table }: { table: TableHandler } = $props()
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
        color: var(--font-grey);
        font-size: 14px;
    }
    button {
        padding: 0 8px;
        height: 32px;
        margin: 0 8px;
        border-radius: 4px;
        border: 1px solid var(--grey-lighten);
        background: var(--grey-lighten);
        color: var(--font);
    }
    button:hover {
        background: var(--grey);
    }
    i {
        font-size: 18px;
        margin-left: 8px;
    }
</style>
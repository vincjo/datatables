<script lang="ts">
    import type { TableHandler } from '$lib/remote'

    type Props = {
        table: TableHandler,
        small?: boolean
        options?: number[]
    }
    let { table, small = false, options = [5, 10, 20] }: Props = $props()
</script>

<aside>
    {#if !small}
        <span>{table.i18n.show}</span>
    {/if}
    <select bind:value={table.rowsPerPage} onchange={() => table.setPage(1)}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    {#if !small}
        <span>{table.i18n.entries}</span>
    {/if}
</aside>

<style>
    aside {
        margin: 8px 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 32px;
        color: #757575;
    }
    select {
        margin: 0 4px;
        background: var(--bg, #fff);
        color: var(--font-grey, #757575);
        border-radius: 4px;
        border: 1px solid var(--grey, #9e9e9e);
        padding: 2px 4px;
    }
    select:focus {
        outline: 2px solid var(--grey, #e0e0e0);
    }
</style>

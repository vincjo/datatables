<script lang="ts">
    import type { TableHandler } from '$lib/client'
    import Filter from './Table_Header_Filter.svelte'
    import ColumnVisibility from './Table_Header_ColumnVisibility.svelte'

    let { table }: { table: TableHandler } = $props()
    const filter = table.createFilter('title')
</script>


<aside class="flex">
    <input type="text" bind:value={filter.value} oninput={() => filter.set()} placeholder="Filter tasks...">
    <Filter {table} key="status"/>
    <Filter {table} key="priority"/>
    {#if table.filters.length > 0}
        <button class="flex" onclick={() => table.clearFilters()}>
            Reset
            <i class="micon">clear</i>
        </button>
    {/if}
</aside>
<ColumnVisibility {table}/>


<style>
    input {
        height: 32px;
        color: var(--font);
        border: 1px solid var(--grey);
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


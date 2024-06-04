<script lang="ts">
    import type { TableHandler } from '$lib'
    import Filter from './Table_Header_Filter.svelte'
    import ColumnVisibility from './Table_Header_ColumnVisibility.svelte'
    type Props = { table: TableHandler, element: HTMLElement }
    let { table, element }: Props = $props()
    const filter = table.createFilter('title')
</script>


<header class="flex">
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
    <ColumnVisibility {table} {element}/>
</header>


<style>
    header {
        justify-content: space-between;
    }
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


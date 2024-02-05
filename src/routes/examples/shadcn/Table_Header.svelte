<script lang="ts">
    import type { DataHandler } from '$lib'
    import Filter from './Table_Header_Filter.svelte'
    import ColumnVisibility from './Table_Header_ColumnVisibility.svelte'
    export let handler: DataHandler
    export let element: HTMLElement
    const filters = handler.getFilters()
    let value = ''

    handler.on('clearFilters', () => value = '')
</script>

<aside class="flex">
    <input type="text" bind:value on:input={() => handler.filter(value, 'title')} placeholder="Filter tasks...">
    <Filter {handler} key="status"/>
    <Filter {handler} key="priority"/>
    {#if $filters.length > 0}
        <button class="flex" on:click={() => handler.clearFilters()}>
            Reset
            <i class="micon">clear</i>
        </button>
    {/if}
</aside>

<ColumnVisibility {handler} {element}/>

<style>
    input {
        height: 32px;
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


<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Column } from '$lib/remote/IDatatable.ts'
    import { type DataHandler, type Row, Search, RowsPerPage, RowCount, SelectedCount, Pagination, Th, ThFilter } from '$lib/remote'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>

    export let search         = true
    export let rowsPerPage    = true
    export let rowCount       = true
    export let selectedCount  = false
    export let pagination     = true
    export let hideHeader     = false
    export let hideFooter     = false
    export let hideRowSelection = false
    export let tableHeight    = (search || rowsPerPage || !hideHeader ? 48 : 8) + (rowCount || selectedCount || pagination || !hideFooter ? 48 : 8)
    export let columns: Column[] = [];

    const selected = handler.getSelected();
    const isAllSelected = handler.isAllSelected();
    const rows = handler.getRows();

    $: isSomeSelected = numSelected > 0 && numSelected < $rows.length;

    let numSelected: number = 0;

    const dispatch = createEventDispatcher();

    let element: HTMLElement
    let clientWidth = 1000

    handler.on('change', () => {
        if (element) element.scrollTop = 0
    })
</script>

<section bind:clientWidth class={$$props.class ?? ''}>
    {#if !hideHeader}
        <header class:container={search || rowsPerPage}>
            <slot name="header">
                    {#if search}
                        <Search {handler} />
                    {/if}
                    {#if rowsPerPage}
                        <RowsPerPage {handler} small={clientWidth < 600} />
                    {/if}
                </slot>                
        </header>
    {/if}

    <article bind:this={element} style="height:calc(100% - {tableHeight}px)">
        <table>
            <thead>
                <tr>
                    {#if !hideRowSelection}
                        <th class="selection">
                            <input
                                type="checkbox"
                                class='checkbox'
                                class:mixedChecked={isSomeSelected}
                                on:click={() => {
                                    handler.selectAll();
                                    dispatch('select', $selected);
                                    numSelected = $selected.length;
                                    }}
                                checked={$isAllSelected}
                            />
                        </th>
                    {/if}
                    {#each columns as column}
                        <Th {handler} orderBy={column.sortable && column.field} identifier={column.identifier} align={column.align} rowSpan={column.rowSpan}>
                            {column.header ?? column.field}
                            {#if column.filterable}
                                <ThFilter {handler} filterBy={column.field} identifier={column.identifier} align={column.align} comparator={column.comparator}>{column.header ?? column.field}</ThFilter>
                            {/if}
                        </Th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr class:active={!hideRowSelection && $selected.includes(row)}>
                        {#if !hideRowSelection}
                            <td class="selection">
                                <input
                                    type="checkbox"
                                    class='checkbox'
                                    on:click={() => {
                                        handler.select(row);
                                        dispatch('select', $selected);
                                        numSelected = $selected.length;
                                        }}
                                    checked={$selected.includes(row)}
                                />
                            </td>
                        {/if}
                        <slot name="row" row={row}>
                            {#each columns as column}
                                <td>{@html row[column.field] ?? ''}</td>
                            {/each}
                        </slot>
                    </tr>
                {/each}
            </tbody>
        </table>
    </article>

    {#if !hideFooter}
        <footer class:container={rowCount || pagination}>
            <slot name="footer">
                {#if selectedCount}
                    <SelectedCount {handler}/>
                {:else if rowCount}
                    <RowCount {handler} small={clientWidth < 600} />
                {/if}
                {#if pagination}
                    <Pagination {handler} small={clientWidth < 600} />
                {/if}
            </slot>
        </footer>
    {/if}
</section>

<style>
    section {
        height: 100%;
    }

    section :global(table) {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }

    section :global(thead) {
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
    }

    header,
    footer {
        min-height: 8px;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    header.container,
    footer.container {
        height: 48px;
    }
    footer {
        border-top: 1px solid #e0e0e0;
    }

    article {
        position: relative;
        /* height:calc(100% - 96px); */
        overflow: auto;
        scrollbar-width: thin;
    }

    article::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    article::-webkit-scrollbar-track {
        background: #f5f5f5;
    }
    article::-webkit-scrollbar-thumb {
        background: #c2c2c2;
    }
    article::-webkit-scrollbar-thumb:hover {
        background: #9e9e9e;
    }
    td {
        padding: 3px 20px;
    }
    td input {
        margin: auto;
        display: block;
    }
</style>

<script lang="ts">
    import {
        type DndEvent,
        dndzone,
        SHADOW_ITEM_MARKER_PROPERTY_NAME,
    } from 'svelte-dnd-action'
    import { TableHandler, Datatable, Search, RowCount, Pagination } from '$lib/src/client'
    import SortButton from './SortButton.svelte'
    import myData from '$site/data/data'
    import { fade } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import { cubicIn } from 'svelte/easing'

    const table = new TableHandler(myData, { rowsPerPage: 10 })

    type Column = { id: number, field: string, name: string }
    let columns: Column[] = $state([
        { id: 1, field: 'id',           name: 'ID' },
        { id: 2, field: 'first_name',   name: 'First name' },
        { id: 3, field: 'last_name',    name: 'Last name' },
    ])

    // svelte-dnd-actions part
    const flipDurationMs = 200
    const consider = (e: CustomEvent<DndEvent<Column>>) => columns = e.detail.items
    const finalize = (e: CustomEvent<DndEvent<Column>>) => columns = e.detail.items
    const getClasses = (item: any) => item[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? 'dragging' : ''
</script>


<section class="bg-darken">
    <Datatable {table}>
        {#snippet header()}
            <Search {table}/>
        {/snippet}
        <table>
            <thead>
                <tr
                    use:dndzone={{ items: columns, flipDurationMs, dropTargetStyle: {} }}
                    onconsider={consider}
                    onfinalize={finalize}
                >
                    {#each columns as column (column.id)}
                        <th animate:flip={{ duration: flipDurationMs }} class="{getClasses(column)}">
                            <SortButton {table} field={column.field}>
                                {column.name}
                                {#if column[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                                    <div in:fade={{ duration: 200, easing: cubicIn }} class="placeholder"></div>
                                {/if}
                            </SortButton>

                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr class="{getClasses(row)}">
                        {#each columns as column (column.id)}
                            <td animate:flip={{ duration: flipDurationMs }}>
                                {row[column.field]}
                            </td>
                        {/each}
                    </tr>

                {/each}
            </tbody>
        </table>
        {#snippet footer()}
            <RowCount {table}/>
            <Pagination {table}/>
        {/snippet}
    </Datatable>
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
    }
    th {
        position: relative;
        background: inherit;
        padding: 8px 20px;
        white-space: nowrap;
        font-size: 13px;
        user-select: none;
        text-align: left;
        border-bottom: 1px solid var(--grey, #e0e0e0);
    }
    .dragging {
        color: var(--primary);
        border: none !important;
        background: transparent !important;
    }
    .placeholder{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        visibility: visible;
        border: 2px dashed var(--primary);
        background: var(--primary-lighten-1);
        border-radius: 4px;
        margin: 0;
    }
</style>
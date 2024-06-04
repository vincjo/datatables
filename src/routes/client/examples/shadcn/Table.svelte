<script lang="ts">
    import { TableHandler, Datatable } from '$lib'
    import { Checkbox } from 'gros/form'
    import Header from './Table_Header.svelte'
    import Footer from './Table_Footer.svelte'
    import Th from './Table_Th.svelte'
    import { data, poemize, glyph } from './utils'
    const table = new TableHandler(data, { rowsPerPage: 10 })
</script>

<Datatable {table} header={Header} footer={Footer}>
    <table>
        <thead>
            <tr>
                <th style:width="160px">
                    <div class="flex">
                        <Checkbox 
                            on:click={() => table.selectAll({ scope: 'currentPage' })}
                            margin={[0,12,0,0]}
                            size={16}
                            checked={table.isAllSelected}
                        />
                        Task
                    </div>
                </th>
                <Th {table} name="Title" field="title">Title</Th>
                <Th {table} name="Status" field="status">Status</Th>
                <Th {table} name="Priority" field="priority">Priority</Th>
            </tr>
        </thead>
        <tbody>
            {#each  table.rows as row}
                <tr class:active={table.selected.includes(row)}>
                    <td>
                        <div class="flex">
                            <Checkbox 
                                on:click={() => table.select(row)}
                                margin={[0,12,0,0]}
                                size={16}
                                checked={table.selected.includes(row)}
                            />
                            {row.id}
                        </div>
                    </td>
                    <td class="truncate">
                        <div class="flex">
                            <span>{row.label}</span> {row.title}
                        </div>
                    </td>
                    <td>
                        <div class="flex">{@html glyph[row.status]} {poemize(row.status)}</div>
                    </td>
                    <td>
                        <div class="flex">{@html glyph[row.priority]} {poemize(row.priority)}</div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    table {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin: 16px 0;
    }
    td :global(svg) {
        margin-right: 6px;
    }
    td span {
        border: 1px solid #e0e0e0;
        border-radius: 9px;
        padding: 0 6px;
        font-size: 10px;
        background: #fafafa;
        margin-right: 8px;
    }
    tbody td {
        border: none;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px 20px;
    }
    tr:last-child td{
        border: none;
    }
    tbody tr:last-child td:first-child{
        border-radius: 0 0 0 8px;
    }
    tbody tr:last-child td:last-child{
        border-radius: 0 0 8px 0;
    }
    .truncate {
        text-overflow: ellipsis;
        font-weight: 500;
        white-space: nowrap;
        max-width: 500px;
        overflow: hidden;
    }
    tr.active {
        background: var(--primary-lighten-1);
    }
    th {
        background:inherit;
        margin:0;
        font-size:13px;
        user-select: none;
        border-bottom:1px solid #e0e0e0;
        text-align: left;
    }
</style>
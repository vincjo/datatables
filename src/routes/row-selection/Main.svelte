<script lang="ts">
    import myData from '$data/data.11000'
    import { Checkbox } from 'gros/form'
    import {
        DataHandler,
        Datatable,
        Th, ThFilter
    } from '$lib/core'

    const handler = new DataHandler(myData, { rowsPerPage: 50 })
    const rows = handler.getRows()
    const selected = handler.getSelected()
    const isAllSelected = handler.isAllSelected()
</script>


<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    <Checkbox 
                        on:click={() => handler.selectAll('id', 'all')}  
                        checked={$isAllSelected}
                    />
                </th>
                <Th {handler} orderBy="id">id</Th>
                <Th {handler} orderBy="first_name">first_name</Th>
                <Th {handler} orderBy="last_name">last_name</Th>
                <Th {handler} orderBy="job_title">job_title</Th>
            </tr>
            <tr>
                <th class="selection"/>
                <ThFilter {handler} filterBy="id"/>
                <ThFilter {handler} filterBy="first_name"/>
                <ThFilter {handler} filterBy="last_name"/>
                <ThFilter {handler} filterBy="job_title"/>
            </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr class:active={$selected.includes(row.id)}>
                <td class="selection">
                    <Checkbox 
                        on:click={() => handler.select(row.id)} 
                        checked={$selected.includes(row.id)}
                    />
                </td>
                <td>{@html row.id}</td>
                <td>{@html row.first_name}</td>
                <td>{@html row.last_name}</td>
                <td>{@html row.job_title}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</Datatable>



<style>
    thead{
        background:#fff;
    }
    thead th.selection {
        width: 48px;
        padding-left: 16px;
        border-bottom: 1px solid #e0e0e0;
    }
    tbody td{
        padding:4px;
    }
    tbody tr:nth-child(even){
        background:#fafafa;
    }
    tbody tr{
        transition:all, 0.2s;
    }
    tbody tr:hover{
        background:#f5f5f5;
    }
    tbody tr.active {
        background: var(--primary-lighten-1)
    }
    td :global(b) {
        font-weight: normal;
        color: #bdbdbd;
        font-family: JetBrains;
        font-size: 11px;
    }
    td.selection {
        padding-left: 16px;
    }
</style>
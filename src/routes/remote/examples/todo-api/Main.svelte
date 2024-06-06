<script lang="ts">
    import { TableHandler, Datatable, Th, ThFilter, Search, RowsPerPage, Pagination, RowCount, type State } from '$lib/remote'
    import { reload } from './api'
    export let data: any[]

    const table = new TableHandler(data, { rowsPerPage: 10, totalRows: 200 })

    table.load((state: State) => reload(state))
</script>

<Datatable basic {table}>
    <table>
        <thead>
            <tr>
                <Th {table} field="id">ID</Th>
                <Th {table} field="title">Title</Th>
                <Th {table} field="completed">Completed</Th>
            </tr>
            <tr>
                <ThFilter {table} field="id"/>
                <ThFilter {table} field="title"/>
                <ThFilter {table} field="completed"/>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td><b>{row.title}</b></td>
                    <td><span>{row.completed  ? '✅' : '❌'}</span></td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    b {
        color: var(--r-primary);
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
    span {
        padding-left: 8px;
    }
</style>

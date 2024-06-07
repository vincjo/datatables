<script lang="ts">
    import { TableHandler, Datatable, Th, RowCount, RowsPerPage, Pagination, type State } from '$lib/remote'
    import { reload } from './api'
    let { data }: { data: any } = $props()

    const table = new TableHandler(data, { rowsPerPage: 5, totalRows: 500 })

    table.load((state: State) => reload(state) )
</script>


<Datatable {table}>
    {#snippet header()}
        <div></div>
        <RowsPerPage {table}/>
    {/snippet}
    <table>
        <thead>
            <tr>
                <Th {table} field="id">ID</Th>
                <Th {table} field="name">Name</Th>
                <Th {table} field="email">Email</Th>
                <Th {table} field="body">Comment</Th>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td><b>{row.name}</b></td>
                    <td>{row.email}</td>
                    <td><p>{row.body.substring(0, 60) + '...'}</p></td>
                </tr>
            {/each}
        </tbody>
    </table>
    {#snippet footer()}
        <RowCount {table}/>
        <Pagination {table}/>
    {/snippet}
</Datatable>

<style>
    b {
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
    p {
        font-size: 12px;
    }
</style>

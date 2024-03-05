<script lang="ts">
    import { DataHandler, Datatable, Th, type State } from '$lib/remote'
    import { reload } from './api'
    export let data: any[]

    const handler = new DataHandler(data, { rowsPerPage: 20, totalRows: 500 })
    const rows = handler.getRows()

    handler.setRemoteControl((state: State) => reload(state) )
</script>

<Datatable {handler} search={false}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">ID</Th>
                <Th {handler} orderBy="name">Name</Th>
                <Th {handler} orderBy="email">Email</Th>
                <Th {handler} orderBy="body">Comment</Th>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td><b>{row.name}</b></td>
                    <td>{row.email}</td>
                    <td><p>{row.body}</p></td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 2px 16px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #fafafa;
    }
    b {
        color: var(--r-primary);
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
    p {
        font-size: 12px;
    }
</style>

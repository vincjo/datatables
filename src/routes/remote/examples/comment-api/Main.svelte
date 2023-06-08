<script lang="ts">
    import { DataHandler, Datatable, type State } from '$lib/remote'
    import { get } from './api_helper'
    export let data: any[]

    const handler = new DataHandler(data, { rowsPerPage: 10, totalRows: 500 })
    const rows = handler.getRows()

    // setPage event
    handler.on('navigate', async (state: State) => {
        return get(handler, state)
    })

    // setRowsPerPage event, triggers "navigate"
    handler.on('display', () => { handler.setPage(1) })

    // search event, triggers "navigate"
    // handler.on('search', () => { search(handler) })

</script>

    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
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
    th {
        text-align: left;
        padding: 8px 16px;
        color: #424242;
        border-bottom: 1px solid #e0e0e0;
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

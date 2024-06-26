<script lang="ts">
    import { TableHandler, Datatable, ThSort, RowCount, RowsPerPage, Pagination, type State } from '$lib/src/server'
    import { reload } from './api'
    let { data }: { data: any } = $props()

    const table = new TableHandler(data, { rowsPerPage: 5, totalRows: 500 })

    table.load((state: State) => reload(state) )
</script>

<section class="bg-darken">
    <Datatable {table}>
        {#snippet header()}
            <div></div>
            <RowsPerPage {table}/>
        {/snippet}
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="id">ID</ThSort>
                    <ThSort {table} field="name">Name</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="body">Comment</ThSort>
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
</section>

<style>
    section {
        border-radius: 8px;
        border: 1px solid var(--grey);
    }
    b {
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
    p {
        font-size: 12px;
    }
</style>

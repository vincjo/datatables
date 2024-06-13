<script lang="ts">
    import { TableHandler, Datatable, ThSort, ThFilter, Pagination, RowsPerPage, Search, type State } from '$lib/src/server'
    import { reload } from './api'
    export let data: any[]

    const table = new TableHandler(data, { rowsPerPage: 10 })

    table.load((state: State) => reload(state))
</script>

<Datatable {table}>
    {#snippet header()}
        <Search {table}/>
        <RowsPerPage {table}/>
    {/snippet}
    <table>
        <thead>
            <tr>
                <ThSort {table} field="id">ID</ThSort>
                <ThSort {table} field="title">Title</ThSort>
                <ThSort {table} field="completed">Completed</ThSort>
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
    {#snippet footer()}
        <div></div>
        <Pagination {table}/>
    {/snippet}
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

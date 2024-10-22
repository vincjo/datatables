<script lang="ts">
    import { TableHandler, Datatable, ThSort, RowsPerPage, RowCount, Pagination, type State } from '$lib/src/server'
    import { reload } from '../api'
    let { data }: { data: any } = $props()

    const table = new TableHandler(data, { rowsPerPage: 20, totalRows: 500 })
    table.load((state: State) => reload(state) )
    table.createView([
        { index: 0, isFrozen: true },
        { index: 1, isFrozen: true },
    ])
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
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td class="frozen">{row.id}</td>
                        <td class="frozen"><b>{row.name.substring(0, 8)}</b></td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
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
        height: 480px;
    }
    td {
        white-space: nowrap;
    }
    b {
        font-size: 11px;
    }
    .frozen {
        background: var(--grey-lighten-2) !important;
    }
</style>

<script lang="ts">
    import { TableHandler, Datatable, ThSort, Search, RowCount, Pagination } from '$lib/src/client'
    import myData from '$site/data/data'

    const table = new TableHandler(myData, { rowsPerPage: 10 })
    const csv = table.createCSV()
</script>

<section class="bg-darken">
    <Datatable {table}>
        {#snippet header()}
            <Search {table}/>
            <button class="flex" onclick={() => csv.download('filename.csv')}>
                <i class="micon">file_download</i>
                Download as CSV
            </button>
        {/snippet}
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="first_name">First Name</ThSort>
                    <ThSort {table} field="last_name">Last Name</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
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
    }
    button {
        background: var(--primary);
        color: #eee;
        margin: 16px;
        padding: 8px 12px;
        font-family: Archivo;
    }
    button i {
        margin-right: 8px;
        font-size: 18px;
    }
    button:hover {
        background: var(--primary-darken);
    }
</style>

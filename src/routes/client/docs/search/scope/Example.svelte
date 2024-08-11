<script>
    import data from '$site/data/data'
    import { TableHandler, Datatable, Th, RowCount, Pagination } from '$lib/src/client'

    const table = new TableHandler(data, { rowsPerPage: 10 })
    const search = table.createSearch(['id', 'last_name'])
</script>


<Datatable {table}>
    {#snippet header()}
        <input type="text" bind:value={search.value} oninput={() => search.set()} placeholder="Search...">
    {/snippet}
    <table>
        <thead>
            <tr>
                <Th>id</Th>
                <Th>first_name</Th>
                <Th>last_name</Th>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
                <tr>
                    <td class="scoped">{row.id}</td>
                    <td>{row.first_name}</td>
                    <td class="scoped">{row.last_name}</td>
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
    input {
        margin-bottom: 24px;
        color: var(--font);
        background: var(--bg);
    }
    td.scoped {
        background: var(--secondary-lighten-1);
    }
</style>
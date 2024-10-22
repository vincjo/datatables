<script>
    import { TableHandler, Datatable, Th, RowCount, Pagination } from '$lib/src/client'
    import data from '$site/data/data'

    const table = new TableHandler(data, { rowsPerPage: 10, highlight: true })
    const search = table.createSearch()
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
                    <td>{@html row.id}</td>
                    <td>{@html row.first_name}</td>
                    <td>{@html row.last_name}</td>
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
    :global(u.highlight) {
        text-decoration: none;
        background: rgba(251, 192, 45, 0.6);
        border-radius: 2px;
    }
</style>
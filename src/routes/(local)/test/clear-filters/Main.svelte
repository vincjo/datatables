<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/client'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()
    const filterCount = handler.getFilterCount()
</script>

<button on:click={() => handler.clearFilters()}>Clear filters ({$filterCount})</button>

<section>
    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <Th {handler} orderBy="first_name">First Name</Th>
                    <Th {handler} orderBy="last_name">Last Name</Th>
                    <Th {handler} orderBy="email">Email</Th>

                </tr>
                <tr>
                    <ThFilter {handler} filterBy="first_name"/>
                    <ThFilter {handler} filterBy="last_name" />
                    <ThFilter {handler} filterBy="email"/>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.email}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
</section>

<style>
    section {
        margin: 24px auto;
        font-size: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #fff;
    }
    button {
        background: var(--secondary);
        display: inline-block;
        color: #fff;
        font-weight:bold;
        padding: 8px;
        border-radius: 4px;
    }
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>

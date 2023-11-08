<script>
    import { Datatable, Th } from '$lib/local'
    export let handler
    const rows = handler.getRows()
</script>


<Datatable {handler} search={false} rowsPerPage={false}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">ID</Th>
                <Th {handler} orderBy="value">VALUE</Th>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.value}</td>
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
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>
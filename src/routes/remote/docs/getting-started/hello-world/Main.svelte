<script lang="ts">
    import { TableHandler, Datatable, ThSort, ThFilter } from '$lib/remote'

    const table = new TableHandler([], { rowsPerPage: 10 })

</script>

<Datatable basic {table}>
    <table>
        <thead>
            <tr>
                <ThSort {table} field="first_name">First Name</ThSort>
                <ThSort {table} field="last_name">Last Name</ThSort>
                <ThSort {table} field="email">Email</ThSort>
            </tr>
            <tr>
                <ThFilter {table} field="first_name"/>
                <ThFilter {table} field="last_name" />
                <ThFilter {table} field="email"/>
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
</Datatable>


<script lang="ts">
    import { TableHandler, Datatable, Th, ThFilter } from '$lib/client'
    import myData from '$site/data/data'

    const table = new TableHandler(myData, { rowsPerPage: 10 })

</script>

<section class="bg-darken">
    <Datatable basic {table}>
        <table>
            <thead>
                <tr>
                    <Th {table} field="first_name">First Name</Th>
                    <Th {table} field="last_name">Last Name</Th>
                    <Th {table} field="email">Email</Th>
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
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
    }
</style>

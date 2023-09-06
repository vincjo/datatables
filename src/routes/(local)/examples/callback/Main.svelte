<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/local'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy={(row) => row.first_name + row.last_name}>
                    First Name + Last Name
                </Th>
                <Th {handler} orderBy="email">Email</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy={(row) => row.first_name + row.last_name}/>
                <ThFilter {handler} filterBy="email" />
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.first_name} {row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>


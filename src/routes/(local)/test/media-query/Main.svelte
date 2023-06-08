<script lang="ts">
    import myData from '$data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()

</script>


<section class="resizable">

    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <Th {handler} orderBy="first_name">First Name</Th>
                    <Th {handler} class="maskable" orderBy="last_name">Last Name</Th>
                    <Th {handler} class="maskable" orderBy="email">Email</Th>

                </tr>
                <tr>
                    <ThFilter {handler} filterBy="first_name"/>
                    <ThFilter {handler} class="maskable" filterBy="last_name" />
                    <ThFilter {handler} class="maskable" filterBy="email"/>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.first_name}</td>
                        <td class="maskable">{row.last_name}</td>
                        <td class="maskable">{row.email}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>

</section>

<style>
    @media (max-width: 1200px) {
        .resizable {
            width: 280px;
        }
        .resizable :global(.maskable) {
            display: none;
        }
    }

    section {
        margin: 24px auto;
        width: 560px;
        font-size: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #fff;
        transition: width, 0.1s;
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

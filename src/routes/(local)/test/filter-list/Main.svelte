<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Th, check } from '$lib'
    import ThFilter from './ThFilter.svelte'
    import Filters from './Filters.svelte'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>


<section class="flex">
    <Filters {handler}/>
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
                    <ThFilter {handler} filterBy="last_name" comparator={check.startsWith}/>
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
        position: relative;
        margin: 0;
        font-size: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #fff;
        padding-left: 176px;
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

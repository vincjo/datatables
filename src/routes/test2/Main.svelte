<script lang="ts">
    import myData from '$data/data'
    import {
        DataHandler,
        Datatable,
        Th, ThFilter
    } from '$lib/core'
    import AdvancedFilter from './AdvancedFilter.svelte'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>



<Datatable {handler} class="datatable">
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="first_name">First Name</Th>
                <Th {handler} orderBy="last_name">Last Name</Th>
                <Th {handler} orderBy="email">Email</Th>
                <Th {handler} orderBy="id">ID</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="first_name"/>
                <ThFilter {handler} filterBy="last_name"/>
                <ThFilter {handler} filterBy="email"/>
                <AdvancedFilter {handler} filterBy="id"/>
            </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.id}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</Datatable>



<style>

    tbody td {
        border: 1px solid #eee;
        padding: 4px 20px;
    }
</style>



















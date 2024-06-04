<script>
    import { DataHandler }  from '$lib/local'
    import Th               from '../Th.svelte'
    import ThFilter         from '../ThFilter.svelte'
    import data             from '$site/data/data'

    const handler = new DataHandler(data, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>

<table>
    <thead>
        <tr>
            <Th {handler} field="first_name">First name</Th>
            <Th {handler} field="last_name">Last name</Th>
            <Th {handler} field="email">Email</Th>
        </tr>
        <tr>
            <ThFilter {handler} field="first_name" />
            <ThFilter {handler} field="last_name" />
            <ThFilter {handler} field="email" />
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

<style>
    table {
        text-align: left;
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }
    td {
        padding: 4px 20px;
        border-bottom: 1px solid #eee;
    }
</style>

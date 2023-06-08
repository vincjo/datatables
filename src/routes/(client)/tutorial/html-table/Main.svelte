<script>
<<<<<<< HEAD:src/routes/tutorial/html-table/Main.svelte
    import { DataHandler } from '$lib/core'
    import data from '$data/data'

    const handler = new DataHandler(data, { rowsPerPage: 20 })
=======
    import { DataHandler }  from '$lib/core'
    import data             from '$data/data'

    const handler = new DataHandler(data, { rowsPerPage: 10 })
>>>>>>> upstream/master:src/routes/(client)/tutorial/html-table/Main.svelte
    const rows = handler.getRows()
</script>

<table>
    <thead>
        <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
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
    td, th {
        padding: 4px 20px;
        border-bottom: 1px solid #eee;
    }
</style>

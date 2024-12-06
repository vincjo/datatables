<script>
    import { TableHandler, Datatable, ThSort } from '$lib/src/client'
    const data = [
        { user: 'John Doe',             created_at: '12/01/2024 11:04:23 AM' },
        { user: 'Tobie Vint',           created_at: '09/30/2020 01:43:06 PM' },
        { user: 'Zacharias Cerman',     created_at: '04/26/2023 05:02:21 PM' },
        { user: 'Gérianna Bunn',        created_at: '03/13/2021 07:58:33 AM' },
        { user: 'Bee Saurin',           created_at: '11/08/2019 03:21:54 PM' },
        { user: 'Méyère Granulette',    created_at: '07/27/2022 08:12:16 PM' },
        { user: 'Jane Doe',             created_at: '01/18/2017 11:38:47 AM' },
        { user: 'Michel Trapu',         created_at: '04/02/2025 04:19:46 PM' },
    ]

    const table = new TableHandler(data, { rowsPerPage: 10 })
</script>


<section class="bg-darken">
    <Datatable {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field={'user'}>user</ThSort>
                    <ThSort {table} field={(row) => new Date(row.created_at).toISOString()}>created_at</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as { user, created_at }}
                    <tr>
                        <td>{user}</td>
                        <td><code>{created_at}</code></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
</section>


<style>
    section {
        border-radius: 8px;
        padding: 16px;
        width: 448px;
        margin: 16px 0;
        border: 1px solid var(--grey);
        height: fit-content;
    }
</style>
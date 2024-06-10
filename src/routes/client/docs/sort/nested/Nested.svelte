<script>
    import { TableHandler, Datatable, ThSort } from '$lib/client'

    const data = [
        { user: { name: 'John Doe', login_count: 120 } },
        { user: { name: 'Tobie Vint', login_count: 24 } },
        { user: { name: 'Zacharias Cerman', login_count: 598 } },
        { user: { name: 'Gérianna Bunn', login_count: 347 } },
        { user: { name: 'Bee Saurin', login_count: 2 } },
        { user: { name: 'Méyère Granulette', login_count: 1085 } },
        { user: { name: 'Jane Doe', login_count: 271 } },
        { user: { name: 'Michel Trapu', login_count: 637 } },
    ]

    const table = new TableHandler(data, { highlight: true })
    const filter = table.createFilter((row) => row.user.name)
</script>


<section class="bg-darken">
    <Datatable {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field={(row) => row.user.login_count}>User</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>
                            {'{'} name: <span>"{@html row.user.name}"</span>, 
                            login_count: <span>{row.user.login_count}</span> {'}'}
                        </td>
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
    span {
        color: var(--secondary);
    }
</style>
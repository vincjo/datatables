<script lang="ts">
    import { TableHandler, Datatable, ThSort, ThFilter } from '$lib/client'
    import myData from '$site/data/data'

    const table = new TableHandler(myData, { rowsPerPage: 20 })
    table.createView([
        { index: 0, isFrozen: true },
        { index: 1, isFrozen: true },
    ])
</script>

<section class="bg-darken">
    <Datatable basic {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="id">ID</ThSort>
                    <ThSort {table} field="first_name">First Name</ThSort>
                    <ThSort {table} field="last_name">Last Name</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                    <ThSort {table} field="email">Email</ThSort>
                </tr>
                <tr>
                    <ThFilter {table} field="id"/>
                    <ThFilter {table} field="first_name"/>
                    <ThFilter {table} field="last_name"/>
                    <ThFilter {table} field="email"/>
                    <ThFilter {table} field="email"/>
                    <ThFilter {table} field="email"/>
                    <ThFilter {table} field="email"/>
                    <ThFilter {table} field="email"/>
                    <ThFilter {table} field="email"/>
                    <ThFilter {table} field="email"/>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td class="frozen">{row.id}</td>
                        <td class="frozen">{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
                        <td>{row.email}</td>
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
        height: 480px;
    }
    td {
        white-space: nowrap;
    }
    .frozen {
        background: var(--grey-lighten-2);
    }
</style>

<script lang="ts">
    import { TableHandler, Datatable, ThSort, ThFilter } from '$lib/client'
    import myData from '$site/data/cars'
    const table = new TableHandler(myData, { rowsPerPage: 10, highlight: true })
</script>

<section class="bg-darken">
    <Datatable basic {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="firstname">First Name</ThSort>
                    <ThSort {table} field="lastname">Last Name</ThSort>
                    <ThSort {table} field="country">Country</ThSort>
                    <ThSort {table} field="car">Car</ThSort>
                </tr>
                <tr>
                    <ThFilter {table} field="firstname"/>
                    <ThFilter {table} field="lastname"/>
                    <ThFilter {table} field="country"/>
                    <ThFilter {table} field="car"/>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>{@html row.firstname}</td>
                        <td>{@html row.lastname}</td>
                        <td>{@html row.country ?? '<code>null</code>'}</td>
                        <td class="list">
                            {#if !row.car}
                                <code>null</code>
                            {:else}
                                <ul>
                                    {#each row.car as car}
                                        <li>
                                            {@html car.model} ({@html car.manufacturer})
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </td>
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
    li {
        font-size: 12px;
        color: var(--secondary);
    }
    td :global(code) {
        color: var(--grey-lighten);
        font-size: 12px;
    }
    ul {
        padding: 0 4px;
        margin: 0;
    }
</style>

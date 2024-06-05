<script lang="ts">
    import { TableHandler, Datatable, Th } from '$lib/client'
    import { data } from '../data_cars'

    let value = ''

    const table = new TableHandler(data)

    const [min, max] = $derived(table.createCalculation('model_year').bounds())
</script>

<section class="flex">
    <aside class="z-depth-2">
        <p>Model year</p>
        <ul>
            <li>Older: {min}</li>
            <li>Newer: {max}</li>
        </ul>
    </aside>
    <article>
        <input type="text" bind:value={table.search} placeholder="Search cars..."/>
        <Datatable {table}>
            <table>
                <thead>
                    <tr>
                        <Th {table} field="make">make</Th> 
                        <Th {table} field="model">model</Th> 
                        <Th {table} field="model_year">model_year</Th> 
                    </tr>
                </thead>
                <tbody>
                    {#each table.rows as row}
                        <tr>
                            <td>{row.make}</td>
                            <td>{row.model}</td>
                            <td>{row.model_year ?? ''}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </Datatable>
    </article>
</section>

<style>
    section {
        border-radius: 8px;
        padding: 16px;
        max-width: 800px;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    article {
        position: relative;
        height: 400px;
    }
    input {
        background: var(--bg);
        border: 1px solid var(--grey);
        color: var(--font);
        height: 32px;
        width: 280px;
        padding: 0 8px;
    }
    aside {
        height: 400px;
        width: 200px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 24px 24px;
        margin-bottom: 24px;
        background: var(--grey-lighten-2);
        margin-right: 24px;
    }
    aside p {
        margin: 0;
        font-size: 13px;
        color: var(--primary);
        text-transform: uppercase;
    }

    thead {
        background: var(--bg);
    }
    tbody td {
        border-right: 1px solid var(--grey-lighten);
        border-bottom: 1px solid var(--grey-lighten);
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: var(--grey-lighten-3);
    }
</style>
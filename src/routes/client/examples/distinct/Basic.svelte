<script lang="ts">
    import { TableHandler, Datatable, ThSort } from '$lib/src/client'
    import { cars } from './data'

    const table = new TableHandler(cars)
    const distinct = table.createCalculation('make').distinct({ field: 'count', direction: 'desc' })
</script>

<section class="flex bg-darken">
    <aside class="z-depth-2">
        <p>Distinct make</p>
        <div class="thin-scrollbar">
            {#each distinct as item}
                {@const { value, count } = item }
                <code>{count}</code> {value} <br>
            {/each}
        </div>
    </aside>
    <article class="bg-darken">
        <Datatable basic {table}>
            <table>
                <thead>
                    <tr>
                        <ThSort {table} field="make">make</ThSort> 
                        <ThSort {table} field="model">model</ThSort> 
                        <ThSort {table} field="model_year">model_year</ThSort> 
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
        align-items: flex-start;
        border: 1px solid var(--grey);
        min-width: 680px;
    }
    article {
        position: relative;
        width: 440px;
        height: 440px;
    }
    aside {
        height: 400px;
        width: 200px;
        border: 1px solid var(--grey-lighten);
        border-radius: 8px;
        padding: 24px 16px 8px 24px;
        margin-bottom: 24px;
        background: var(--grey-lighten-3);
        margin-right: 24px;
    }
    aside p {
        margin: 0;
        font-size: 13px;
        color: var(--primary);
        text-transform: uppercase;
    }
    aside code {
        color: var(--secondary);
        font-size: 24px;
    }
    aside div {
        overflow-y: auto;
        position: relative;
        height: 320px;
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
        background: var(--primary-lighten-1);
    }
</style>
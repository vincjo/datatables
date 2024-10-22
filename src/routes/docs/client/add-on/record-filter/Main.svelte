<script lang="ts">
    import { TableHandler, Datatable, ThSort } from '$lib/src/client'
    import { data } from './data_cars'

    const table = new TableHandler(data)

    const distinct = table.createCalculation('make').distinct({ sort: ['value', 'asc'] })

    const filter = table.createRecordFilter(distinct)
</script>

<section class="flex bg-darken">
    <aside class="z-depth-2">
        <input type="text" 
            bind:value={filter.value} 
            oninput={() => filter.set()} 
            placeholder="Search makes..."
            style:margin-bottom="8px"
            spellcheck="false"
        >
        <div class="thin-scrollbar">
            {#each filter.records as { value, count }}
                <code>{count}</code> {value} <br>
            {/each}
        </div>
    </aside>
    <article class="bg-darken">
        <Datatable {table}>
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
        max-width: 800px;
        align-items: flex-start;
        border: 1px solid var(--grey);
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
        background: var(--grey-lighten-3);
    }
</style>
<script lang="ts">
    import { DataHandler, Datatable, Th } from '$lib/client'
    import { cars } from './data'

    let value = ''

    const handler = new DataHandler(cars)
    const rows = handler.getRows()
    const rowCount = handler.getRowCount()
    const distinct = handler.createCalculation('make').distinct().sort((a, b) => (a.count < b.count ? 1 : -1))
</script>

<section class="flex">
    <aside class="z-depth-2">
        <p>Distinct make</p>
        <div class="thin-scrollbar">
            {#each distinct as item}
                {@const { value, count } = item }
                <code>{count}</code> {value} <br>
            {/each}
        </div>
    </aside>
    <article>
        
        <Datatable {handler}>
            <input slot="header" type="text" bind:value  on:input={() => handler.search(value)} placeholder="Search cars..."/>
            <table>
                <thead>
                    <tr>
                        <Th {handler} orderBy="make">make</Th> 
                        <Th {handler} orderBy="model">model</Th> 
                        <Th {handler} orderBy="model_year">model_year</Th> 
                    </tr>
                </thead>
                <tbody>
                    {#each $rows as row}
                        <tr>
                            <td>{row.make}</td>
                            <td>{row.model}</td>
                            <td>{row.model_year ?? ''}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <strong slot="footer">Showing {$rowCount.total} row(s)</strong>
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
        border: 1px solid var(--grey);
    }
    article {
        position: relative;
        height: 400px;
    }
    input {
        background: var(--bg);
        height: 32px;
        width: 280px;
        padding: 0 8px;
        margin-bottom: 8px;
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
    strong {
        margin-top:8px;
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
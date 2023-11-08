<script lang="ts">
    import { DataHandler, Datatable, Th } from '$lib/local'
    import { data } from '../data_cars'

    let value = ''

    const handler = new DataHandler(data)
    const rows = handler.getRows()

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
        <input type="text" bind:value  on:input={() => handler.search(value)} placeholder="Search cars..."/>
        <Datatable {handler} search={false} rowsPerPage={false} pagination={false}>
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
        background: #fff;
        height: 32px;
        width: 280px;
        padding: 0 8px;
    }
    aside {
        height: 400px;
        width: 200px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 24px 24px;
        margin-bottom: 24px;
        background: #fafafa;
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
        background: #fff;
    }
    tbody td {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #fafafa;
    }
</style>
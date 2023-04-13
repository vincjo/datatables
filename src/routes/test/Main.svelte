<script lang="ts">
    import myData from '$data/int-bool-string'
    import {
        DataHandler,
        Datatable,
        Th, ThFilter
    } from '$lib/core'

    const handler = new DataHandler(myData, { rowsPerPage: 50 })
    const rows = handler.getRows()

</script>

<button on:click={() => handler.clearFilters()}>Clear Filters</button>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">Int</Th>
                <Th {handler} orderBy="user">Str</Th>
                <Th {handler} orderBy="is_online">Bool</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="id" isEqualTo/>
                <ThFilter {handler} filterBy="user"/>
                <ThFilter {handler} filterBy="is_online"/>
            </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{@html row.id ?? `<b>null</b>`}</td>
                <td>{@html row.user ?? `<b>null</b>`}</td>
                <td>{@html row.is_online ?? `<b>null</b>`}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</Datatable>



<style>
    thead{
        background:#fff;
    }
    tbody td{
        padding:4px;
    }
    tbody tr:nth-child(even){
        background:#fafafa;
    }
    tbody tr{
        transition:all, 0.2s;
    }
    tbody tr:hover{
        background:#f5f5f5;
    }
    td :global(b) {
        font-weight: normal;
        color: #bdbdbd;
        font-family: JetBrains;
        font-size: 11px;
    }
    button {
        position: fixed;
        top: 16px;
        left: 800px;
        height: 60px;
        width: 120px;
        background:var(--primary);
        z-index: 200;
        border:none;
        border-radius: 8px;
        color: #eee;
        font-weight: bold;
    }
</style>
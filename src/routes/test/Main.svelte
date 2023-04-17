<script lang="ts">
    import myData from '$data/int-bool-string'
    import {
        DataHandler, check,
        Datatable,
        Th, ThFilter
    } from '$lib/core'

    const handler = new DataHandler(myData, { rowsPerPage: 50 })
    const rows = handler.getRows()

</script>


<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">isEqualTo</Th>
                <Th {handler} orderBy="user">startsWith</Th>
                <Th {handler} orderBy="is_online">isTrue</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="id" comparator={check.isEqualTo}/>
                <ThFilter {handler} filterBy="user" comparator={check.startsWith}/>
                <ThFilter {handler} filterBy="is_online" comparator={check.isTrue}/>
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
</style>
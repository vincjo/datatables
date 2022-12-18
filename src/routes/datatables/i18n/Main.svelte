<script lang="ts">
    import myData from '$data/data'
    import { 
        DataHandler, 
        Datatable, 
        Th, 
        ThFilter 
    } from '$lib/core'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()

    const i18n = {
        search: 'კვლევა...',
        filter: 'ფილტრი',
        rowsPerPage: 'შოუ {rowsPerPage} შედეგები',
        rowCount: 'შოუ {start} დან {end} ჯამიდან {total}',
        noRows: 'Უშედეგო',
        previous: 'წინა',
        next: 'შემდეგ',
    }
</script>



<Datatable {handler} {i18n}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy={'first_name'}>First Name</Th>
                <Th {handler} orderBy={'last_name'}>Last Name</Th>
                <Th {handler} orderBy={'email'}>Email</Th>
            </tr>
            <tr>
                <ThFilter {handler} {i18n} filterBy={'first_name'}/>
                <ThFilter {handler} {i18n} filterBy={'last_name'}/>
                <ThFilter {handler} {i18n} filterBy={'email'}/>
            </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
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
</style>
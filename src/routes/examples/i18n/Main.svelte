<script lang="ts">
    import myData from '$data/data'
    import {
        DataHandler,
        Th, ThFilter,
        Search, RowsPerPage,
        RowCount, Pagination
    } from '$lib/core'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()
    let clientWidth = 1000
</script>



<section bind:clientWidth={clientWidth}>
    <header>
        <Search      {handler} i18n={'კვლევა...'}/>
        <RowsPerPage {handler} i18n={{show: 'შოუ', entries: 'შედეგები'}}/>
    </header>

    <table>
        <thead>
            <tr>
                <Th {handler} orderBy={'first_name'}>First Name</Th>
                <Th {handler} orderBy={'last_name'}>Last Name</Th>
                <Th {handler} orderBy={'email'}>Email</Th>
            </tr>
            <tr>
                <ThFilter {handler} i18n={'ფილტრი'} filterBy={'first_name'}/>
                <ThFilter {handler} i18n={'ფილტრი'} filterBy={'last_name'}/>
                <ThFilter {handler} i18n={'ფილტრი'} filterBy={'email'}/>
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

    <footer>
        <RowCount
            {handler}
            small={clientWidth < 600}
            i18n={{
                rowCount: 'შოუ {start} დან {end} ჯამიდან {total}',
                noRows: 'Უშედეგო'
            }}
        />
        <Pagination
            {handler}
            small={clientWidth < 600}
            i18n={{ previous: 'წინა', next: 'შემდეგ' }}
        />
    </footer>
</section>



<style>
    table {
        text-align:center;
        border-collapse:separate;
        border-spacing:0;
        width:100%;
    }
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

    header, footer {
        height:48px;
        padding:0 16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    footer{ 
        border-top: 1px solid #e0e0e0;
    }
</style>
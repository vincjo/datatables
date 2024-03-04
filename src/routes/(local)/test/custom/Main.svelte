<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Pagination, RowsPerPage, Search } from '$lib'
    import { Select } from 'gros/form'
    import SelectedCount from '$lib/remote/SelectedCount.svelte'
    import RowCount from '$lib/local/RowCount.svelte'

    const handler = new DataHandler(myData, { rowsPerPage: 20, i18n: {search: 'Search', rowCount: '{start} - {end} of {total} items', next: '▶', previous: '◀'} })
    const rows = handler.getRows()
</script>

<Datatable {handler} class="datatable"
        columns={
            [
                { field: 'first_name', header:'First Name', sortable: true },
                { field: 'last_name', header:'Last Name', sortable: true },
                { field: 'email', header:'Email', sortable: true }
            ]
        }
        on:select={(event) => console.log(event.detail)}
    >
    <div slot="header">
        <Search {handler}/>
    </div>
    <div slot="footer">
        <div class="subFooter">
            <RowsPerPage {handler} small={true}/>
            <RowCount {handler}/>
        </div>
        <div class="subFooter">
            <Pagination {handler} dropdown={true} dropdownText={"of {pageCount} pages"}/>
        </div>
    </div>
</Datatable>

<style>
    [slot=header], [slot=footer] {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .subFooter {
       display: flex;
    flex-direction: row; 
    }
</style>
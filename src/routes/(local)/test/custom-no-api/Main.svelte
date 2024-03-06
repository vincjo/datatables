<script lang="ts">
    import { Datatable, Pagination, RowsPerPage, Search, RowCount, Td } from '$lib/remote';
    import { DataHandler } from '$lib/local';
    import type { Column } from '$lib/remote/IDatatable';
    import myData from '$site/data/data'

    const columns: Column[] = [
        { field: 'first_name', header:'First Name', sortable: true },
        { field: 'last_name', header:'Last Name', sortable: true },
        { field: 'email', header:'Email', sortable: true },
        { field: 'button', header: '' }
    ];
    
    let handler = new DataHandler(myData, { rowsPerPage: 20, i18n: {search: 'Search', rowCount: '{start} - {end} of {total} items', next: '▶', previous: '◀'} });

</script>

<Datatable {handler} class="datatable"
    {columns}
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
    <svelte:fragment slot="row" let:row>
        <Td {columns} {row} let:cell>
            {#if cell.field === 'button'}
                <button on:click={() => console.log(row.first_name)}>console.log first name</button>
            {:else if cell.field === 'first_name'}
                <strong>{cell.value}</strong>
            {:else}
                {cell.value ?? ''}
            {/if}
        </Td>
    </svelte:fragment>
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
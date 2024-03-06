<script lang="ts">
    import { onMount } from 'svelte';
    import { DataHandler, type State, Datatable, Pagination, RowsPerPage, Search, RowCount, Td } from '$lib/remote';
    import type { Column } from '$lib/remote/IDatatable';

    let myData = [];
    let totalResults = 0;

    async function fetchData({ offset, rowsPerPage, search }: State | {offset: number, rowsPerPage: number, search?: string}) {
        let params = `limit=${rowsPerPage}&skip=${offset}`;
        if (search) params = `q=${search}&${params}`;

        const response = await fetch(`https://dummyjson.com/users${search ? '/search' : ''}?${params}`);
        const json = await response.json();
        handler.setTotalRows(json.total);
        return json.users;
    };

    const columns: Column[] = [
        { field: 'firstName', header:'First Name', sortable: true },
        { field: 'lastName', header:'Last Name', sortable: true },
        { field: 'email', header:'Email', sortable: true },
        { field: 'button', header: '' }
    ];
    
    let handler = new DataHandler(myData, { rowsPerPage: 20, totalRows: totalResults, i18n: {search: 'Search', rowCount: '{start} - {end} of {total} items', next: '▶', previous: '◀'} });
    handler.onChange((state: State) => fetchData(state));

    onMount(async () => {
        myData = await fetchData({offset: 0, rowsPerPage: 20});
        handler.invalidate();
    });
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
                <button on:click={() => console.log(row.firstName)}>console.log first name</button>
            {:else if cell.field === 'firstName'}
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
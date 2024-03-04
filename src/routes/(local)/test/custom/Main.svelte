<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Search } from '$lib'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
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
</Datatable>
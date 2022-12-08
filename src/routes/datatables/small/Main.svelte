<script>
    import Datatable    from './Datatable.svelte'
    import DataHandler  from '$lib/DataHandler'
    import Th           from '$lib/Th.svelte'
    import ThFilter     from '$lib/ThFilter.svelte'
    import data         from '$data/data'

    const handler = new DataHandler(data, { rowsPerPage: 50 })
    const rows = handler.getRows()
</script>



<Datatable handler={handler}>
    <table>
        <thead>
            <tr>
                <Th handler={handler} orderBy={'id'}>ID</Th>
                <Th handler={handler} orderBy={'first_name'}>First Name</Th>
                <Th handler={handler} orderBy={'last_name'}>Last Name</Th>
                <Th handler={handler} orderBy={'email'}>Email</Th>
            </tr>
            <tr>
                <ThFilter handler={handler} filterBy={'id'}/>
                <ThFilter handler={handler} filterBy={'first_name'}/>
                <ThFilter handler={handler} filterBy={'last_name'}/>
                <ThFilter handler={handler} filterBy={'email'}/>
            </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</Datatable>



<style>
    table{
        text-align:center;
        border-collapse:collapse;
        width:100%;
    }
    thead{
        position:sticky;
        inset-block-start:0;
        background:#fff;
        z-index:1;
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
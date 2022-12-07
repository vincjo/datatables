<script>
    import DataHandler  from '$lib/DataHandler'
    import Th           from '../Th.svelte'
    import ThFilter     from '../ThFilter.svelte'
    import Datatable    from './Datatable.svelte'
    import data         from  '$data/data'

    const handler = new DataHandler(data, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>



<Datatable handler={handler}>
    <table>
        <thead>
            <tr>
                <Th handler={handler} orderBy={(row) => row.first_name + row.last_name}>First Name + Last Name</Th>
                <Th handler={handler} orderBy={'email'}>Email</Th>
            </tr>
            <tr>
                <ThFilter handler={handler} filterBy={(row) => row.first_name + row.last_name}/>
                <ThFilter handler={handler} filterBy={'email'}/>
            </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.first_name} {row.last_name}</td>
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
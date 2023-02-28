<script lang="ts">
    import { DataHandler, Datatable, Th } from '$lib/core'
    import data from '$data/data.75'

    const handler = new DataHandler(data, { rowsPerPage: 5 })
    const rows = handler.getRows()
</script>


<Datatable {handler} rowsPerPage={false} search={false}>
    <table>
        <thead>
            <tr>
                <th></th>
                <Th {handler} orderBy="id">ID</Th>
                <Th {handler} orderBy="first_name">First name</Th>
                <Th {handler} orderBy="last_name">Last name</Th>
                <Th {handler} orderBy="email">Email</Th>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
            <tr>    
                <td>
                    <div class="flex">
                        <button class="btn">
                            <i class="micon">edit</i>
                        </button>
                        <button class="btn">
                            <i class="micon">delete_forever</i>
                        </button>
                    </div>
                </td>
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
    button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #f5f5f5;
        border: 1px solid #e0e0e0;
    }
    button i {
        color: var(--secondary);
        font-size: 20px;
    }
</style>
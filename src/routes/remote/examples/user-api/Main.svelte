<script lang="ts">
    import { DataHandler, Datatable, type State } from '$lib/remote'
    import { reload } from './api'
    export let data: { users: any[], total: number }

    const handler = new DataHandler(data.users, { rowsPerPage: 10, totalRows: data.total })
    const rows = handler.getRows()

    handler.setRemoteControl( (state: State) => reload(state) )
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Fristname</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Height / Weight</th>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>
                        <img src="{row.image}" alt="avatar" />
                    </td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.age}</td>
                    <td>{row.gender}</td>
                    <td>
                        {(row.height / 100)}m / {row.weight}kg
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: #fff;
    }
    th {
        text-align: left;
        padding: 8px 16px;
        color: #424242;
        border-bottom: 1px solid #e0e0e0;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 2px 16px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    img {
        height: 56px;
        width: 56px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
</style>

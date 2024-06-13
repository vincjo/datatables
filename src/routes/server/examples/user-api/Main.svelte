<script lang="ts">
    import { TableHandler, Datatable, Th, type State } from '$lib/src/server'
    import { reload } from './api'
    export let data: { users: any[], total: number }

    const table = new TableHandler(data.users, { rowsPerPage: 10, totalRows: data.total })

    table.load( (state: State) => reload(state) )
</script>

<Datatable basic {table}>
    <table>
        <thead>
            <tr>
                <Th>ID</Th>
                <Th>Avatar</Th>
                <Th>Fristname</Th>
                <Th>Lastname</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
                <Th>Height / Weight</Th>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
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
                        {String(row.height / 100).substring(0, 4)}m / {String(row.weight).substring(0, 4)}kg
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    img {
        height: 56px;
        width: 56px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
</style>

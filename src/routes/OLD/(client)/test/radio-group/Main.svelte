<script lang="ts">
    import myData from './data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/local'

    const handler = new DataHandler(myData)
    const rows = handler.getRows()

</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="first_name">First Name</Th>
                <Th {handler} orderBy="last_name">Last Name</Th>
                <Th {handler} orderBy="email">Email</Th>
                <Th {handler} orderBy="permission">Permission</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="first_name"/>
                <ThFilter {handler} filterBy="last_name" />
                <ThFilter {handler} filterBy="email"/>
                <ThFilter {handler} filterBy="permission"/>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                    <td>
                        <label class="flex items-center space-x-2">
                            <input type="radio" checked={row.permission === 0} 
                                on:change={() => console.log(`changed to ${0}`)}
                            />
                            <p>Not shared</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="radio" checked={row.permission === 1} 
                                on:change={() => console.log(`changed to ${1}`)}
                            />
                            <p>View</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="radio" checked={row.permission === 2} 
                                on:change={() => console.log(`changed to ${2}`)}
                            />
                            <p>View & Edit</p>
                        </label>
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
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    p {
        margin: 0;
    }
</style>

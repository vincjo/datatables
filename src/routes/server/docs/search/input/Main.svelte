<script lang="ts">
    import { TableHandler, Datatable, Th, type State, Pagination, Search } from '$lib/src/server'
    import { reload } from './api'
    export let data: { users: any[]; total: number }

    const table = new TableHandler(data.users, { rowsPerPage: 10, totalRows: data.total })
    const search = table.createSearch()
    table.load((state: State) => reload(state))
</script>

<section class="bg-darken">
    <Datatable {table}>
        {#snippet header()}
            <input type="text" bind:value={search.value} oninput={() => search.set()} placeholder="Search..." spellcheck="false">
        {/snippet}
        <table>
            <thead>
                <tr>
                    <Th>Fristname</Th>
                    <Th>Lastname</Th>
                    <Th>Gender</Th>
                    <Th>Height / Weight</Th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.gender}</td>
                        <td>
                            {String(row.height / 100).substring(0, 4)}m / {String(row.weight).substring(0, 4)}kg
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        {#snippet footer()}
            <div></div>
            <Pagination {table}/>
        {/snippet}
    </Datatable>
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
        max-width: 600px;
    }
    input {
        width: 200px;
        margin: 16px;
        color: var(--font);
        height: 32px;

    }
</style>

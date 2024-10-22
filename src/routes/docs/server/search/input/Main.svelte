<script lang="ts">
    import { TableHandler, Datatable, Th, type State, Pagination, RowCount } from '$lib/src/server'
    import { reload } from './api'
    let { data }: { data: { users: any[]; total: number } } = $props()

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
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        {#snippet footer()}
            <RowCount {table}/>
            <Pagination {table}/>
        {/snippet}
    </Datatable>
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
        max-width: 400px;
    }
    input {
        width: 200px;
        margin: 16px;
        color: var(--font);
        height: 32px;

    }
</style>

<script lang="ts">
    import { TableHandler, Datatable, Th, ThFilter, Pagination, type State } from '$lib/src/server'
    import { reload } from './api'
    let { data }: { data: any[] } = $props()

    const table = new TableHandler(data, { rowsPerPage: 10 })

    table.load((state: State) => reload(state))
    const filter = table.createFilter('completed')
</script>

<section class="bg-darken">
    <Datatable {table}>
        <table>
            <thead>
                <tr>
                    <Th>completed</Th>
                </tr>
                <tr>
                    <th class="input">
                        <input type="text" bind:value={filter.value} oninput={() => filter.set()} placeholder="Filter...">
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td><span>{row.completed  ? '✅' : '❌'} {row.completed}</span></td>
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
        border-radius: 8px;
        border: 1px solid var(--grey);
        padding: 16px 40px 0 40px;
        width: 400px;
        margin: 16px 0;
    }
    span {
        padding-left: 8px;
    }
    input {
        color: var(--font);
        margin: 8px 0;
    }
    th.input {
        border-bottom: 2px solid var(--grey);
    }
</style>

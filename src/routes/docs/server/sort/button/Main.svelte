<script lang="ts">
    import { TableHandler, Datatable, ThSort, Pagination, type State } from '$lib/src/server'
    import { reload } from './api'
    let { data }: { data: any } = $props()

    const table = new TableHandler(data, { rowsPerPage: 10, totalRows: 500 })

    table.load((state: State) => reload(state) )
</script>

<section class="bg-darken">
    <Datatable {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="name">name</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td><b>{row.name}</b></td>
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
        max-width: 480px;
    }
    b {
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
</style>

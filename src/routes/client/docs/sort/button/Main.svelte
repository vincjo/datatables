<script>
    import data from '$site/data/data'
    import { TableHandler, Datatable, ThSort, Pagination } from '$lib/client'

    let { scoped = undefined, isHighlighted = false } = $props()

    const table = new TableHandler(data, { highlight: isHighlighted })
    const search = table.createSearch(scoped)
</script>


<section class="bg-darken">
    <Datatable {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="last_name">last_name</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>{row.last_name}</td>
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
        padding: 16px 40px 0 40px;
        width: 600px;
        margin: 16px 0;
        border: 1px solid var(--grey);
    }
</style>
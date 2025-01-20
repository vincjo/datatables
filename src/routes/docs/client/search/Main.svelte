<script>
    import data from '$site/data/data'
    import { TableHandler, Datatable, Th, Pagination } from '$lib/src/client'

    let { scoped = undefined, isHighlighted = false } = $props()

    const table = new TableHandler(data, { highlight: isHighlighted, rowsPerPage: 10 })
    const search = table.createSearch(scoped)
</script>


<section class="bg-darken">
    <Datatable {table}>
        {#snippet header()}
            <input type="text" bind:value={search.value} oninput={() => search.set()} placeholder="Search...">
        {/snippet}
        <table>
            <thead>
                <tr>
                    <Th>id</Th>
                    <Th>first_name</Th>
                    <Th>last_name</Th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td class={{ scoped: scoped && !isHighlighted }}>{@html row.id}</td>
                        <td>{@html row.first_name}</td>
                        <td class={{ scoped: scoped && !isHighlighted }}>{@html row.last_name}</td>
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
    input {
        margin-bottom: 24px;
        color: var(--font);
        background: var(--bg);
    }
    td.scoped {
        background: var(--secondary-lighten-1);
    }
</style>
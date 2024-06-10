<script>
    import data from '$site/data/data'
    import { TableHandler, Datatable, Th, Pagination } from '$lib/client'

    let { check = undefined, isHighlighted = false } = $props()

    const table = new TableHandler(data, { highlight: isHighlighted })
    const filter = table.createFilter('last_name', check)
</script>


<section class="bg-darken">
    <Datatable {table}>
        <table>
            <thead>
                <tr>
                    <Th>last_name</Th>
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
                        <td>{@html row.last_name}</td>
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
        width: 400px;
        margin: 16px 0;
        border: 1px solid var(--grey);
        height: 460px;
    }
    input {
        color: var(--font);
        margin: 8px 0;
    }
    th.input {
        border-bottom: 2px solid var(--grey);
    }
</style>
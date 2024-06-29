<script>
    import data from '$site/data/data'
    import { TableHandler, Datatable, Th, Pagination } from '$lib/src/client'

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            search.regex()
        }
    }
    const table = new TableHandler(data, { rowsPerPage: 10 })
    const search = table.createSearch()
    search.value = '/\\.ru/g'
</script>


<section class="bg-darken">
    <Datatable {table}>
        {#snippet header()}
            <aside class="flex">
                <input type="text" bind:value={search.value} placeholder="Regex goes here" onkeypress={handleKey} spellcheck="false">
                <button type="button" class="btn" onclick={() => search.regex()}>OK</button>
            </aside>
        {/snippet}
        <table>
            <thead>
                <tr>
                    <Th>id</Th>
                    <Th>first_name</Th>
                    <Th>last_name</Th>
                    <Th>email</Th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.email}</td>
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
        width: 680px;
        margin: 16px 0;
        border: 1px solid var(--grey);
    }
    aside {
        margin-bottom: 24px;
    }
    input {
        color: var(--font);
        height: 36px;
        border-radius: 4px 0 0 4px;
        background: var(--bg);
        font-family: JetBrains;
    }
    button {
        color: var(--font);
        background: var(--primary);
        height: 36px;
        border-radius: 0 4px 4px 0;
        padding: 0 8px;
    }
    td.scoped {
        background: var(--secondary-lighten-1);
    }
</style>
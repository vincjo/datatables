<script lang="ts">
    import { TableHandler } from '$lib/client'
    import data from '$site/data/tree'
    import Tree from './Main_Tree.svelte'
    import Search from './Main_Search.svelte'

    const table = new TableHandler(data, { rowsPerPage: 10 })
    let value = $state('')
</script>

<section class="bg-darken">
    <!-- <aside>
        <input type="text" bind:value oninput={() => table.searchHandler.set(value)}>
    </aside> -->
    <Search {table}/>
    <Tree folders={table.rows}/>
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 24px;
    }
    /* aside {
        margin-bottom: 16px;
    }
    input {
        color: var(--font);
    } */
</style>

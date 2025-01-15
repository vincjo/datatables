<script lang="ts">
    import { TableHandler } from '$lib/src/client'
    import tree from '$site/data/tree'
    import Tree from './Main_Tree.svelte'
    import Search from './Main_Search.svelte'

    const table = new TableHandler(tree, { rowsPerPage: 10, highlight: true })
</script>

<section class="bg-darken">
    <Search {table}/>
    <Tree folders={table.rows ?? []}/>
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 40px;
    }
    /* aside {
        margin-bottom: 16px;
    }
    input {
        color: var(--font);
    } */
</style>

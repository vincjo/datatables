<script lang="ts">
    import { TableHandler } from '$lib/client'
    import { pokedex } from '$site/data/pokedex'
    import Table from './MCF_Table.svelte'
    import Filter from './MCF_TableFilter.svelte'
    const table = new TableHandler(pokedex, { rowsPerPage: 10 })
</script>


<section class="flex">
    <Filter {table}/>
    <aside>
        <Table {table}/>
    </aside>
</section>


<style>
    section {
        position: relative;
        align-items: flex-start;
        border-radius: 8px;
    }
    aside {
        position: absolute;
        left: 188px;
        top: 0;
        bottom: 0;
        right: 0;
    }
</style>
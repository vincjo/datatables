<script lang="ts">
    import { DataHandler } from '$lib/client'
    import { pokedex } from '$site/data/pokedex'
    import Table from './MCF_Table.svelte'
    import Filter from './MCF_TableFilter.svelte'
    const handler = new DataHandler(pokedex, { rowsPerPage: 10 })
 
</script>


<section class="flex">
    <Filter {handler}/>
    <aside>
        <Table {handler}/>
    </aside>
</section>


<style>
    section {
        position: relative;
        align-items: flex-start;
    }
    aside {
        position: absolute;
        left: 188px;
        top: 0;
        bottom: 0;
        right: 0;
    }
</style>
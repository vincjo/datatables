<script lang="ts">
    import type { DataHandler } from '$lib'
    import RowsPerPage from './Table_Footer_RowsPerPage.svelte'
    import Pagination from './Table_Footer_Pagination.svelte'
    import RowSelection from './Table_Footer_RowSelection.svelte'
    export let handler: DataHandler
</script>

<footer class="flex">
    <RowSelection {handler}/>

    <div class="flex">
        <RowsPerPage {handler}/>
        <Pagination {handler}/>
    </div>
</footer>


<style>
    footer {
        justify-content: space-between;
    }
</style>
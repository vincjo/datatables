<script lang="ts">
    import type { DataHandler } from '$lib'
    import RowsPerPage from './Table_Footer_RowsPerPage.svelte'
    import Pagination from './Table_Footer_Pagination.svelte'
    import RowSelection from './Table_Footer_RowSelection.svelte'
    export let handler: DataHandler
</script>


<RowSelection {handler}/>

<div class="flex">
    <RowsPerPage {handler}/>
    <Pagination {handler}/>
</div>
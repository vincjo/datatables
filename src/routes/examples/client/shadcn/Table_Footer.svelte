<script lang="ts">
    import type { TableHandler } from '$lib'
    import RowsPerPage from './Table_Footer_RowsPerPage.svelte'
    import Pagination from './Table_Footer_Pagination.svelte'
    import RowSelection from './Table_Footer_RowSelection.svelte'
    let { table }: { table: TableHandler } = $props()
</script>

    <div style:margin-left="8px">
        <RowSelection {table}/>
    </div>

    <div class="flex" style:margin-right="8px">
        <RowsPerPage {table}/>
        <Pagination {table}/>
    </div>


<style>
    div {
        margin-top: 16px;
    }
</style>
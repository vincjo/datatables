<script lang="ts">
    import type { TableHandler } from '$lib'
    import RowsPerPage from './Table_Footer_RowsPerPage.svelte'
    import Pagination from './Table_Footer_Pagination.svelte'
    import RowSelection from './Table_Footer_RowSelection.svelte'
    type Props = { table: TableHandler }
    let { table }: Props = $props()
</script>

    <div>
        <RowSelection {table}/>
    </div>

    <div class="flex">
        <RowsPerPage {table}/>
        <Pagination {table}/>
    </div>


<style>
    div {
        margin-top: 16px;
    }
</style>
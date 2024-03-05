<script lang="ts">
    import { type DataHandler, RowsPerPage, Pagination } from '$lib/client'
    export let handler: DataHandler
    export let small: boolean
</script>

<footer>
    <RowsPerPage {handler} {small}/>
    <Pagination {handler}  {small}/>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-top: 1px solid var(--grey, #e0e0e0);
    }
</style>
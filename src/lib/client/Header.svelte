<script lang="ts">
    import { type DataHandler, Search, RowsPerPage } from '$lib/client'
    export let handler: DataHandler
    export let small: boolean
</script>

<header>
    <Search {handler} {small}/>
    <RowsPerPage {handler}  {small}/>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
</style>
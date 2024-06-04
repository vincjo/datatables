<script lang="ts">
    import { type TableHandler, Search, RowsPerPage } from '$lib/client'
    type T = $$Generic<Row>
    type Props = { table: TableHandler<T>, small: boolean }

    let { table, small = false }: Props = $props()
</script>

<header>
    <Search {table}/>
    <RowsPerPage {table} {small}/>
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
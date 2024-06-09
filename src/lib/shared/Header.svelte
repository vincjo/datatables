<script lang="ts">
    import { type TableHandlerLike, Search, RowsPerPage } from '$lib/shared'
    type T = $$Generic<Row>
    type Props = { table: TableHandlerLike<T> }

    let { table }: Props = $props()
</script>

<header>
    <Search {table}/>
    <RowsPerPage {table}/>
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
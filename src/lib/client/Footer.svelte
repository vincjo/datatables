<script lang="ts">
    import { type TableHandler, RowCount, Pagination } from '$lib/client'
    type T = $$Generic<Row>
    type Props = { table: TableHandler<T>, small: boolean }

    let { table, small = false }: Props = $props()
</script>

<footer>
    <RowCount {table} {small}/>
    <Pagination {table}  {small}/>
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
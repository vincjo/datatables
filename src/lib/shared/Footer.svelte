<script lang="ts">
    import { type TableHandler, RowCount, Pagination } from '$lib/shared'
    type T = $$Generic<Row>
    type Props = { table: TableHandler<T> }

    let { table }: Props = $props()
</script>

<footer>
    <RowCount {table}/>
    <Pagination {table}/>
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
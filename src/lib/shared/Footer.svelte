<script lang="ts">
    import { type TableHandlerLike, RowCount, Pagination } from '$lib/shared'
    type T = $$Generic<Row>
    type Props = { table: TableHandlerLike<T> }

    let { table }: Props = $props()
</script>

<RowCount {table}/>
<Pagination {table}/>
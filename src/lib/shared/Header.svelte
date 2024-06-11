<script lang="ts">
    import { type TableHandlerLike, Search, RowsPerPage } from '$lib/shared'
    type T = $$Generic<Row>
    type Props = { table: TableHandlerLike<T> }

    let { table }: Props = $props()
</script>

<Search {table}/>
<RowsPerPage {table}/>
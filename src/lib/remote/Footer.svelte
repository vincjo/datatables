<script lang="ts">
    import { type TableHandler, RowCount, Pagination, SelectedCount } from '$lib/remote'

    type Props = { table: TableHandler, small?: boolean, selection?: boolean }

    let { table, small = false, selection = false }: Props = $props()
</script>

<footer>
    <RowCount {table} {small}/>
    {#if selection}
        <SelectedCount {table}/>
    {:else}
        <Pagination {table} {small}/>
    {/if}
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
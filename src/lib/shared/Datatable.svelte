<script lang="ts">
    import type { Snippet } from 'svelte'
    import { type TableHandlerLike, Search, RowsPerPage, RowCount, Pagination } from '$lib/shared'
    type T = $$Generic<Row>
    type Props = {
        table: TableHandlerLike<T>,
        basic?: boolean,
        header?: Snippet,
        footer?: Snippet,
        children: Snippet
    }
    let { table, basic = false, header, footer, children }: Props = $props()

    table.on('change', () => {
        if (table.element) table.element.scrollTop = 0
    })
</script>

<section bind:clientWidth={table.clientWidth}>

    <header class:container={basic || header}>
        {#if basic === true}
            <Search {table}/>
            <RowsPerPage {table}/>
        {:else if header}
            {@render header()}
        {/if}
    </header>

    <article bind:this={table.element} class="thin-scrollbar">
        {@render children()}
    </article>

    <footer class:container={basic || footer}>
        {#if basic}
            <RowCount {table}/>
            <Pagination {table}/>
        {:else if footer}
            {@render footer()}
        {/if}
    </footer>

</section>

<style>
    section {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    section :global(table) {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }
    section :global(thead) {
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
    }
    section :global(thead tr:first-child th) {
        padding: 8px 20px;
    }
    section :global(tbody tr) {
        transition: background, 0.2s;
    }
    section :global(tbody tr:hover) {
        background: var(--grey-lighten-3, #fafafa);
    }
    section :global(tbody td) {
        padding: 4px 20px;
        border-right: 1px solid var(--grey-lighten, #eee);
        border-bottom: 1px solid var(--grey-lighten, #eee);
    }
    section :global(tbody td:first-child) {
        border-left: 1px solid var(--grey-lighten, #eee);
    }
    section :global(tbody td.numeric) {
        text-align: right;
        font-family: JetBrains, monospace, inherit;
    }
    header, footer {
        min-height: 4px;
        padding: 0;
    }
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    footer.container {
        border-top: 1px solid var(--grey, #e0e0e0);
    }
    article {
        position: relative;
        height: 100%;
        overflow: auto;
        /* scrollbar-width: thin; */
    }
    article::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    article::-webkit-scrollbar-track {
        background: #f5f5f5;
    }
    article::-webkit-scrollbar-thumb {
        background: #c2c2c2;
    }
    article::-webkit-scrollbar-thumb:hover {
        background: #9e9e9e;
    }
    article :global(.hidden) {
        display: none;
    }
    article :global(u.highlight) {
        text-decoration: none;
        background: rgba(251, 192, 45, 0.6);
        border-radius: 2px;
    }
</style>

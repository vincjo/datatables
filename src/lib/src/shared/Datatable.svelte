<script lang="ts">
    import './svelte-simple-datatable.css'
    import type { Snippet } from 'svelte'
    import { type TableHandlerLike, Search, RowsPerPage, RowCount, Pagination } from '$lib/src/shared'
    type T = $$Generic<Row>
    type Props = {
        table: TableHandlerLike<T>,
        basic?: boolean,
        headless?: boolean,
        header?: Snippet,
        footer?: Snippet,
        children: Snippet
    }
    let { table, basic = false, headless = false, header = undefined, footer = undefined, children }: Props = $props()

    table.on('change', () => table.element ? table.element.scrollTop = 0 : '')
</script>

<section bind:clientWidth={table.clientWidth} class:svelte-simple-datatable={!headless}>

    <header>
        {#if header}
            {@render header()}
        {:else if basic === true}
            <Search {table}/>
            <RowsPerPage {table}/>
        {/if}
    </header>

    <article bind:this={table.element} class="thin-scrollbar">
        {@render children()}
    </article>

    <footer class:divider={basic}>
        {#if footer}
            {@render footer()}
        {:else if basic === true}
            <RowCount {table}/>
            <Pagination {table}/>
        {/if}
    </footer>

</section>

<style>
    section {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: inherit;
        border-radius: inherit;
    }
    header, footer {
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    article {
        position: relative;
        height: 100%;
        overflow: auto;
        background: inherit;
    }
    article :global(.hidden) {
        display: none;
    }
</style>

<script lang="ts">
    import type { Snippet } from 'svelte'
    import { type TableHandlerLike, Header, Footer  } from '$lib/shared'

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

    <aside class:container={header}>
        {#if basic === true}
            <Header {table}/>
        {:else if header}
            {@render header()}
        {/if}
    </aside>

    <article bind:this={table.element} class="thin-scrollbar">
        {@render children()}
    </article>

    <aside class:container={footer}>
        {#if basic}
            <Footer {table}/>
        {:else if footer}
            {@render footer()}
        {/if}
    </aside>

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
    aside {
        min-height: 4px;
        padding: 0;
    }
    aside.container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    aside.container:last-child {
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
</style>

<script lang="ts">
    import type { Component, Snippet } from 'svelte'
    import { type TableHandler, type Row, Header, Footer  } from '$lib/client'

    type T = $$Generic<Row>
    type Props = { table: TableHandler<T>, basic?: boolean, header?: Component, footer?: Component, children: Snippet }
    let {
        table,
        basic = false,
        header = basic ? Header: null,
        footer = basic ? Footer: null,
        children
    }: Props = $props()

    let element: HTMLElement = $state(undefined)
    let clientWidth = $state(1000)
    let small = $derived(clientWidth < 600)

    table.on('change', () => {
        if (element) element.scrollTop = 0
    })
</script>

<section bind:clientWidth>

    <aside>
        {#if header}
            <svelte:component this={header} {table} {small} {element}/>
        {/if}
    </aside>

    <article bind:this={element} class="thin-scrollbar">
        {@render children()}
    </article>

    <aside>
        {#if footer}
            <svelte:component this={footer} {table} {small} {element}/>
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

<script lang="ts">
    import type { ComponentType } from 'svelte'
    import { type DataHandler, type Row, Search, RowsPerPage, RowCount, Pagination  } from '$lib/local'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>

    export let search       = true
    export let rowsPerPage  = true
    export let rowCount     = true
    export let pagination   = true
    export let header: ComponentType[] = [search   ? Search   : null, rowsPerPage ? RowsPerPage : null]
    export let footer: ComponentType[] = [rowCount ? RowCount : null, pagination  ? Pagination  : null]
    const hasHeader = header.filter(Boolean).length > 0
    const hasFooter = footer.filter(Boolean).length > 0

    let element: HTMLElement
    let clientWidth = 1000
    $: small = clientWidth < 600

    handler.on('change', () => {
        if (element) element.scrollTop = 0
    })
</script>

<section bind:clientWidth class={$$props.class ?? ''}>

    <header class:container={hasHeader}>
        {#each header as component}
            <svelte:component this={component} {handler} {small} {element}/>
        {/each}
    </header>

    <article bind:this={element}>
        <slot />
    </article>

    <footer class:container={hasFooter}>
        {#each footer as component}
            <svelte:component this={component} {handler} {small} {element}/>
        {/each}
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
    section :global(thead tr th) {
        border-bottom: 1px solid #e0e0e0;
    }
    section :global(tbody tr) {
        transition: background, 0.2s;
    }
    section :global(tbody tr:hover) {
        background: #fafafa;
    }
    section :global(tbody td) {
        padding: 4px 20px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    section :global(tbody td.numeric) {
        text-align: right;
        font-family: monospace, inherit;
    }
    header,
    footer {
        min-height: 4px;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    footer {
        border-top: 1px solid #e0e0e0;
    }
    header.container,
    footer.container {
        min-height: 48px;
    }

    article {
        position: relative;
        height: 100%;
        overflow: auto;
        scrollbar-width: thin;
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

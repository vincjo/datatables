<script lang="ts">
    import type { ComponentType } from 'svelte'
    import { type DataHandler, type Row, Search, RowsPerPage, RowCount, Pagination } from '$lib/client'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>

    export let search       = true
    export let rowsPerPage  = true
    export let rowCount     = true
    export let pagination   = true
    export let header: ComponentType[] = (search || rowsPerPage) ? [search ? Search : null, rowsPerPage ? RowsPerPage : null] : []
    export let footer: ComponentType[] = (rowCount || pagination) ? [rowCount ? RowCount : null, pagination ? Pagination : null] : []
    const hasHeader = header[0] ? true : false
    const hasFooter = footer[0] ? true : false

    let element: HTMLElement
    let clientWidth = 1000

    handler.on('change', () => {
        if (element) element.scrollTop = 0
    })
    const minus = (hasHeader ? 48 : 8) + (hasFooter ? 48 : 8)

    $: small = clientWidth < 600
</script>

<section bind:clientWidth class={$$props.class ?? ''}>

    <header class:container={hasHeader}>
        {#each header as component}
            <svelte:component this={component} {handler} {small}/>
        {/each}
    </header>

    <article bind:this={element} style="height:calc(100% - {minus}px)">
        <slot />
    </article>

    <footer class:container={hasFooter}>
        {#each footer as component}
            <svelte:component this={component} {handler} {small}/>
        {/each}
    </footer>

</section>

<style>
    section {
        height: 100%;
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
        height: 48px;
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
</style>

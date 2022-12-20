<script lang="ts">
    import {
        type DataHandler,
        Search, RowsPerPage,
        RowCount, Pagination
    } from '$lib/core'

    export let handler: DataHandler
    export let sticky = false
    let element: HTMLElement | undefined
    let clientWidth = 1000

    const triggerChange = handler.getTriggerChange()
    $: $triggerChange, scrollTop()

    const scrollTop = () => {
        if (element) element.scrollTop = 0
    }
</script>



<section class:sticky={sticky} bind:clientWidth={clientWidth}>
    <header>
        <Search      {handler}/>
        <RowsPerPage {handler}/>
    </header>

    <article bind:this={element} class:sticky={sticky}>
        <slot/>
    </article>

    <footer>
        <RowCount   {handler} small={clientWidth < 600}/>
        <Pagination {handler} small={clientWidth < 600}/>
    </footer>
</section>



<style>
    section.sticky {
        height:inherit;
    }

    section :global(table) {
        text-align:center;
        border-collapse:separate;
        border-spacing:0;
        width:100%;
    }

    header, footer {
        height:48px;
        padding:0 16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    footer{ 
        border-top: 1px solid #e0e0e0;
    }

    article {
        position:relative;
        height:calc(100% - 96px);
        overflow:auto;
        scrollbar-width:thin;
    }

    article::-webkit-scrollbar {width: 6px;height: 6px;}
    article::-webkit-scrollbar-track {background: #f5f5f5;}
    article::-webkit-scrollbar-thumb {background: #c2c2c2;}
    article::-webkit-scrollbar-thumb:hover {background: #9e9e9e;}

    article.sticky :global(thead) {
        position:sticky;
        inset-block-start:0;
    }

</style>
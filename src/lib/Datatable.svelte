<script>
    import Search       from '$lib/Search.svelte'
    import RowsPerPage  from '$lib/RowsPerPage.svelte';
    import RowCount     from '$lib/RowCount.svelte'
    import Pagination   from '$lib/Pagination.svelte'

    export let handler
    export let sticky = false
    let element
    let width = 1000

    const triggerChange = handler.getTriggerChange()
    $: $triggerChange, scrollTop()

    const scrollTop = () => {
        if (element) element.scrollTop = 0
    }
</script>



<section class:sticky={sticky} bind:clientWidth={width}>
    <header>
        <Search handler={handler}/>
        <RowsPerPage handler={handler}/>
    </header>

    <article bind:this={element} class:sticky={sticky}>
        <slot/>
    </article>

    <footer>
        <RowCount handler={handler}   small={width < 600}/>
        <Pagination handler={handler} small={width < 600}/>
    </footer>
</section>



<style>
    section.sticky {
        height:inherit;
        position:relative;
        border-radius:inherit;
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
    article::-webkit-scrollbar-track-piece:start {top: 40px;}

    article.sticky :global(thead) {
        position:sticky;
        inset-block-start:0;
        z-index:1;
    }

</style>
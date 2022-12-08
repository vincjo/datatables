<script>
    import Search       from '$lib/Search.svelte'
    import RowsPerPage  from '$lib/RowsPerPage.svelte';
    import RowCount     from '$lib/RowCount.svelte'
    import Pagination   from '$lib/Pagination.svelte'
    
    export let handler
    let element

    const triggerChange = handler.getTriggerChange()
    $: $triggerChange, scrollTop()

    const scrollTop = () => {
        if (element) element.scrollTop = 0
    }
</script>



<section>
    <header>
        <Search handler={handler}/>
        <RowsPerPage handler={handler}/>
    </header>

    <article class="table" bind:this={element}>
        <slot/>
    </article>

    <footer>
        <RowCount handler={handler}/>
        <Pagination handler={handler}/>
    </footer>
</section>



<style>
    section, section * {box-sizing: border-box;}
    section{
        height:inherit;
        position:relative;
        border-radius:8px;
    }
    header{
        height:48px;
        padding:0 16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    article{
        position:absolute;
        top:48px;
        right:0;
        bottom:48px;
        left:0;
        overflow:auto;
        border-bottom: 1px solid #e0e0e0;
        scrollbar-width:thin;
    }
    article::-webkit-scrollbar {width: 6px;height: 6px;}
    article::-webkit-scrollbar-track {background: #f5f5f5;}
    article::-webkit-scrollbar-thumb {background: #c2c2c2;}
    article::-webkit-scrollbar-thumb:hover {background: #9e9e9e;}
    article::-webkit-scrollbar-track-piece:start {top: 40px;}

    footer{
        position:absolute;
        right:0;
        bottom:0;
        left:0;
        height:48px;
        padding:0 16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
</style>
<script>
    import Search       from '$lib/Search.svelte'
    import RowsPerpage  from '$lib/RowsPerPage.svelte'
    import RowCount     from '$lib/RowCount.svelte'
    import Pagination   from '$lib/Pagination.svelte'
    
    export let handler
</script>



<section>
    <header>
        <Search handler={handler}/>
        <RowsPerpage handler={handler}/>
    </header>

    <article class="table">
        <slot/>
    </article>

    <footer>
        <RowCount handler={handler}/>
        <Pagination handler={handler}/>
    </footer>
</section>



<style>
    section, section * {box-sizing: border-box;}

    header, footer{
        height:48px;
        padding:0 16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    article{
        border-bottom: 1px solid #e0e0e0;
    }
</style>
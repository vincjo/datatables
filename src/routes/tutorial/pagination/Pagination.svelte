<script>
    export let handler
    const pageNumber = handler.getPageNumber()
    const pageCount  = handler.getPageCount()
    const pages      = handler.getPages({ ellipsis: true }) 
</script>


<section class="pagination">
    <button type="button"
        class="text-nav"
        class:disabled={$pageNumber === 1}
        on:click={() => handler.setPage('previous')}
    >
        Previous
    </button>
    {#each $pages as pageValue}
        <button type="button"
            class:active={$pageNumber === pageValue}
            class:ellipse={pageValue === null}
            on:click={() => handler.setPage(pageValue)}
        >
            {pageValue ?? '...'}
        </button>
    {/each}
    <button type="button"
        class="text-nav"
        class:disabled={$pageNumber === $pageCount}
        on:click={() => handler.setPage('next')}
    >
        Next
    </button>
</section>


<style>
    section {
        display:flex;
        height:32px;
    }
    button {
        background:inherit;
        height:32px;
        width:32px;
        color:#616161;
        font-size:13px;
        margin:0;
        padding:0;
        transition:all, 0.2s;
        line-height:32px;
        border:1px solid #e0e0e0;
        border-right:none;
        outline:none;
    }
    button:first-child {
        border-radius: 4px 0 0 4px;
    }
    button:last-child {
        border-right: 1px solid #e0e0e0;
        border-radius: 0 4px 4px 0;
    }
    button:not(.active):hover {
        background: #eee;
        cursor: pointer;
    }
    button.text-nav {
        width: auto;
        min-width: 70px;
        cursor: pointer;
    }
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }
    button.active {
        background: #eee;
        font-weight: bold;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
</style>
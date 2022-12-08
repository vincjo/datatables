<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler
    const pageNumber = handler.getPageNumber()
    const pageCount  = handler.getPageCount()
</script>


<section>
    
    <button type="button"
        class:disabled={$pageNumber === 1} 
        on:click={() => handler.setPage(1)}
    >
        &#10092;&#10092;
    </button>
    
    <button type="button"
        class:disabled={$pageNumber === 1} 
        on:click={() => handler.setPage('previous')}
    >
        &#10094;
    </button>

    <button 
        class:disabled={$pageNumber === $pageCount} 
        on:click={() => handler.setPage('next')}
    >   
        &#10095;
    </button>
    
    <button 
        class:disabled={$pageNumber === $pageCount} 
        on:click={() => handler.setPage($pageCount)}
    >
        &#10093;&#10093;
    </button>

</section>



<style>
    section {
        display:flex;
        flex-direction:row;
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
        font-weight: bold;
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
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
    button.disabled {
        color: #bdbdbd;
    }
</style>
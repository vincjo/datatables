<script lang="ts">
    import type { DataHandler, Row } from '$lib/client'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let small = false

    const currentPage = handler.getCurrentPage()
    const pageCount = handler.getPageCount()
    const pages = handler.getPages({ ellipsis: true })
</script>

<section class={$$props.class ?? ''}>
    {#if small}
        <button
            type="button"
            class="small"
            class:disabled={$currentPage === 1}
            on:click={() => handler.setPage(1)}
        >
            &#10092;&#10092;
        </button>
        <button
            type="button"
            class:disabled={$currentPage === 1}
            on:click={() => handler.setPage('previous')}
        >
            &#10094;
        </button>
        <button
            class:disabled={$currentPage === $pageCount}
            on:click={() => handler.setPage('next')}
        >
            &#10095;
        </button>
        <button
            class="small"
            class:disabled={$currentPage === $pageCount}
            on:click={() => handler.setPage($pageCount)}
        >
            &#10093;&#10093;
        </button>
    {:else}
        <button
            type="button"
            class:disabled={$currentPage === 1}
            on:click={() => handler.setPage('previous')}
        >
            {@html handler.i18n.previous}
        </button>
        {#each $pages as page}
            <button
                type="button"
                class:active={$currentPage === page}
                class:ellipse={page === null}
                on:click={() => handler.setPage(page)}
            >
                {page ?? '...'}
            </button>
        {/each}
        <button
            type="button"
            class:disabled={$currentPage === $pageCount}
            on:click={() => handler.setPage('next')}
        >
            {@html handler.i18n.next}
        </button>
    {/if}
</section>

<style>
    section {
        display: flex;
    }
    button {
        background: inherit;
        height: 32px;
        width: 32px;
        color: var(--font-grey, #9e9e9e);
        cursor: pointer;
        font-size: 13px;
        margin: 0;
        padding: 0;
        transition: all, 0.2s;
        line-height: 32px;
        border: 1px solid var(--grey, #e0e0e0);
        border-right: none;
        border-radius: 0;
        outline: none;
    }
    button:first-child {
        border-radius: 4px 0 0 4px;
    }
    button:last-child {
        border-right: 1px solid var(--grey, #e0e0e0);
        border-radius: 0 4px 4px 0;
    }

    button:first-child:not(.small),
    button:last-child:not(.small) {
        min-width: 72px;
    }

    button:not(.active):hover {
        background: var(--grey-lighten, #eee);
    }
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }
    button.active {
        background: var(--grey-lighten, #eee);
        font-weight: bold;
        color: var(--font, #424242);
        cursor: default;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
</style>

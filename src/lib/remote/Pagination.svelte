<script lang="ts">
    import type { DataHandler, Row } from '$lib/remote'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>

    const pageNumber = handler.getPageNumber()
</script>

<section class={$$props.class ?? ''}>
    <button
        type="button"
        class:disabled={$pageNumber === 1}
        on:click={() => handler.setPage('previous')}
    >
        &#10094;
    </button>
    <button class="disabled page">page <b>{$pageNumber}</b></button>
    <button
        on:click={() => handler.setPage('next')}
    >
        &#10095;
    </button>
</section>

<style>
    section {
        display: flex;
    }
    button {
        background: inherit;

        color: #616161;
        cursor: pointer;
        font-size: 13px;
        margin: 0;
        padding: 0;
        transition: all, 0.2s;
        line-height: 32px;
        border: 1px solid #e0e0e0;
        border-right: none;
        border-radius: 0;
        outline: none;
    }
    button:first-child {
        border-radius: 4px 0 0 4px;
    }
    button:last-child {
        border-right: 1px solid #e0e0e0;
        border-radius: 0 4px 4px 0;
    }

    button:first-child:not(.small),
    button:last-child:not(.small) {
        min-width: 40px;
    }

    button:not(.active):hover {
        background: #eee;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
    button.page {
        width: 72px;
        background: #fafafa;
    }
</style>

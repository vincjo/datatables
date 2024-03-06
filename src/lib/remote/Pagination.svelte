<script lang="ts">
    import type { DataHandler, Row } from '$lib/remote'

    type T = $$Generic<Row>

    export let handler
    export let small = false
    export let extraSmall = false
    export let dropdown = false
    export let dropdownText: string = 'of {pageCount} pages'

    const rowCount = handler.getRowCount();
    const pageNumber = handler.getPageNumber()
    const pageCount = handler.getPageCount()
    const pages = handler.getPages({ ellipsis: true })
    const allPages = handler.getPages()

    const setPage = (value: 'previous' | 'next' | number) => {
        handler.setPage(value)
        if (handler.invalidate) handler.invalidate()
    }

    function handleDropdownChange(event) {
        handler.setPage(Number(event.target.value))
    }
</script>

<section class={$$props.class ?? ''}>
    {#if $pages === undefined}
        <button
            type="button" class="small"
            class:disabled={$pageNumber === 1}
            on:click={() => setPage('previous')}
        >
            &#10094;
        </button>
        <button class="page">page <b>{$pageNumber}</b></button>
        <button
            type="button" class="small"
            on:click={() => setPage('next')}
        >
            &#10095;
        </button>
    {:else}
        {#if dropdown}
            <select bind:value={$pageNumber} on:change={(handleDropdownChange)}>
                {#each $allPages as page}
                    <option value={page}>
                        {page}
                    </option>
                {/each}
            </select>
            <div class="dropdownText">
                {dropdownText.replaceAll('{pageCount}', $pageCount.toString())}
            </div>
        {/if}
        {#if small || extraSmall}
            {#if !extraSmall}
                <button
                    type="button"
                    class="small"
                    class:disabled={$pageNumber === 1}
                    on:click={() => setPage(1)}
                >
                    &#10092;&#10092;
                </button>
            {/if}
            <button
                type="button"
                class:small={extraSmall}
                class:disabled={$pageNumber === 1}
                on:click={() => setPage('previous')}
            >
                &#10094;
            </button>
            <button
                class:small={extraSmall}
                class:disabled={$pageNumber === $pageCount}
                on:click={() => setPage('next')}
            >
                &#10095;
            </button>
            {#if !extraSmall}
                <button
                    class="small"
                    class:disabled={$pageNumber === $pageCount}
                    on:click={() => setPage($pageCount)}
                >
                    &#10093;&#10093;
                </button>
            {/if}
        {:else}
            <button
                type="button"
                class="previous custom"
                class:disabled={$pageNumber === 1}
                on:click={() => setPage('previous')}
            >
                {@html handler.i18n.previous}
            </button>
            {#if !dropdown}
                {#each $pages as page}
                    <button
                        type="button"
                        class:active={$pageNumber === page}
                        class:ellipse={page === null}
                        on:click={() => setPage(page)}
                    >
                        {page ?? '...'}
                    </button>
                {/each}
            {/if}
            <button
                type="button"
                class="next custom"
                class:disabled={$pageNumber === $pageCount}
                on:click={() => setPage('next')}
            >
                {@html handler.i18n.next}
            </button>
        {/if}
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

    button.previous, button.next {
        padding: 0 10px;
        width: fit-content;
    }

    button:first-child:not(.small):not(.custom),
    button:last-child:not(.small):not(.custom) {
        min-width: 72px;
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
    button.page:hover {
        background: #fafafa;
        cursor: default;
    }
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }
    button.active {
        background: #eee;
        font-weight: bold;
        cursor: default;
    }
    button.disabled {
        color: #bdbdbd;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
    .dropdownText {
       margin: auto 10px;
    }
</style>

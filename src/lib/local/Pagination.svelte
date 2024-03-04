<script lang="ts">

    import type { DataHandler, Row } from '$lib/local'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let small = false
    export let extraSmall = false
    export let dropdown = false
    export let dropdownText: string = 'of {pageCount} pages'

    const pageNumber = handler.getPageNumber()
    const pageCount = handler.getPageCount()
    const pages = handler.getPages({ ellipsis: true })
    const allPages = handler.getPages()

    function handleDropdownChange(event) {
        handler.setPage(Number(event.target.value))
    }
</script>

<section class={$$props.class ?? ''}>
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
                on:click={() => handler.setPage(1)}
            >
                &#10092;&#10092;
            </button>
        {/if}
        <button
            type="button"
            class:small={extraSmall}
            class:disabled={$pageNumber === 1}
            on:click={() => handler.setPage('previous')}
        >
            &#10094;
        </button>
        <button
            class:small={extraSmall}
            class:disabled={$pageNumber === $pageCount}
            on:click={() => handler.setPage('next')}
        >
            &#10095;
        </button>
        {#if !extraSmall}
            <button
                class="small"
                class:disabled={$pageNumber === $pageCount}
                on:click={() => handler.setPage($pageCount)}
            >
                &#10093;&#10093;
            </button>
        {/if}
    {:else}
        <button
            type="button"
            class="previous custom"
            class:disabled={$pageNumber === 1}
            on:click={() => handler.setPage('previous')}
        >
            {@html handler.i18n.previous}
        </button>
        {#if !dropdown}
            {#each $pages as page}
                <button
                    type="button"
                    class:active={$pageNumber === page}
                    class:ellipse={page === null}
                    on:click={() => handler.setPage(page)}
                >
                    {page ?? '...'}
                </button>
            {/each}
        {/if}
        <button
            type="button"
            class="next custom"
            class:disabled={$pageNumber === $pageCount}
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
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }
    button.active {
        background: #eee;
        font-weight: bold;
        cursor: default;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
    .dropdownText {
       margin: auto 10px;
    }
</style>

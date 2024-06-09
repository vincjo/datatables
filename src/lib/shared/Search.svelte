<script lang="ts">
    import type { TableHandlerLike } from '$lib/shared'
    type T = $$Generic<Row>
    let { table }: { table: TableHandlerLike<T> } = $props()
    const search = table.createSearch()
</script>

<input
    bind:value={search.value}
    oninput={() => search.set()}
    placeholder={table.i18n.search}
    spellcheck="false"
/>

<style>
    input {
        margin: 8px 16px;
        border: 1px solid var(--grey, #e0e0e0);
        color: var(--font-grey, #424242);
        border-radius: 4px;
        outline: none;
        padding: 0 8px;
        line-height: 24px;
        height: 24px;
        background: transparent;
        width: 40%;
        max-width: 176px;
        min-width: 96px;
        transition: all, 0.1s;
    }
    input:focus {
        border: 1px solid var(--grey, #e0e0e0);
        outline: 2px solid var(--grey, #e0e0e0);
    }
    input::placeholder {
        color: #9e9e9e;
        line-height: 24px;
    }
</style>

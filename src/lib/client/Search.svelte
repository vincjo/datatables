<script lang="ts">
    import type { DataHandler, Row } from '$lib/client'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    let value = ''

    handler.on('clearSearch', () => value = '')
</script>

<input
    class={$$props.class ?? ''}
    bind:value
    placeholder={handler.i18n.search}
    spellcheck="false"
    on:input={() => handler.search(value)}
/>

<style>
    input {
        margin: 8px 16px;
        border: 1px solid var(--grey, #e0e0e0);
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

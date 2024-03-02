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
    on:input={() => handler.search(value, ['last_name', 'email'])}
/>

<style>
    input {
        border: 2px dashed var(--primary);
        border-radius: 4px;
        outline: none;
        line-height: 24px;
        margin: 0;
        height: 24px;
        background: transparent;
        width: 60%;
        max-width: 176px;
        min-width: 96px;
        transition: all, 0.1s;
        padding: 16px 8px !important;
        margin: 16px;
    }
    input:focus {
        border: 2px solid var(--primary);
    }
    input::placeholder {
        color: #9e9e9e;
        line-height: 24px;
    }
</style>

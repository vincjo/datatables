<script lang="ts">
<<<<<<< HEAD
    type T = $$Generic<{ [key: string]: unknown }>

    import type { DataHandler } from '$lib/core'
=======
    import type { DataHandler, Row } from '$lib/core'

    type T = $$Generic<Row>

>>>>>>> upstream/master
    export let handler: DataHandler<T>
    let value = ''
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
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        outline: none;
        padding: 0 8px;
        line-height: 24px;
        margin: 0;
        height: 24px;
        background: transparent;
        width: 40%;
        max-width: 176px;
        min-width: 96px;
        transition: all, 0.1s;
    }
    input:focus {
        border: 1px solid #bdbdbd;
    }
    input::placeholder {
        color: #9e9e9e;
        line-height: 24px;
    }
</style>

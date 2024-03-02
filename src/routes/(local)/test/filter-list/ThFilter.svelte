<script lang="ts">
    import type { DataHandler, Field, Comparator, Row } from '$lib/client'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let filterBy: Field<T>
    export let comparator: Comparator<T> = null

    const filter = handler.createFilter(filterBy, comparator)
    filter.on('clear', () => value = '')

    let value: string = ''
</script>

<th class={$$props.class ?? ''}>
    <aside class="flex">
        <input
            type="text"
            placeholder={handler.i18n.filter}
            spellcheck="false"
            bind:value
            on:input={() => filter.set(value)}
        />
        {#if value}
            <button on:click={() => filter.clear()}>❌</button>
        {/if}
    </aside>

</th>

<style>
    th {
        border-bottom: 1px solid #e0e0e0;
    }
    input {
        height: 24px;
        border: none;
        text-align: left;
        padding: 0 20px;
        background: inherit;
        outline: none;
        border-radius: 0;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }
    input::placeholder {
        color: #bdbdbd;
        font-style: italic;
        font-size: 13px;
    }
    input:focus {
        outline: none;
        border: none;
    }
</style>

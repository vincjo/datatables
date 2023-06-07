<script lang="ts">
    import type { DataHandler, FilterBy, Comparator, Row } from '$lib'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let filterBy: FilterBy<T>
    export let align: 'left' | 'right' | 'center' = 'left'
    export let comparator: Comparator<T> = null

    let value: string = ''
</script>

<th class={$$props.class ?? ''}>
    <input
        style:text-align={align}
        type="text"
        placeholder={handler.i18n.filter}
        spellcheck="false"
        bind:value
        on:input={() => handler.filter(value, filterBy, comparator)}
    />
</th>

<style>
    th {
        border-bottom: 1px solid #e0e0e0;
    }
    input {
        width: 100%;
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

<script lang="ts">
    import type { DataHandler, FilterBy, Row } from '$lib/local'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let filterBy: FilterBy<T>
    export let triggerClearFilters: number 

    let value: string = null
    $: triggerClearFilters, value = null
</script>

<th class={$$props.class ?? ''}>
    <input
        type="text"
        placeholder={handler.i18n.filter}
        spellcheck="false"
        bind:value
        on:input={() => handler.filter(value, filterBy)}
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
        border: 2px solid var(--primary-lighten-3);
        border-radius: 4px;
    }
    input::placeholder {
        color: #bdbdbd;
        font-style: italic;
        font-size: 13px;
    }

</style>

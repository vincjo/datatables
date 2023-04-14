<script lang="ts">
    import type { DataHandler } from '$lib/core'
    export let handler: DataHandler
    export let filterBy = null
    export let comparator: Function = null

    let value = ''
</script>


<th>
    <input 
        type="text"
        placeholder="{handler.i18n.filter}"
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
        margin: -1px 0 0 0;
        padding: 0;
        width: 100%;
        height: 24px;
        border: none;
        text-align: center;
        background:inherit;
        outline: none;
        font-size: 14px;
    }
    input::placeholder {
        color: #bdbdbd;
        font-style: italic;
        font-size: 13px;
    }
    input:focus{
        outline: none;
        border: none;
    }
</style>
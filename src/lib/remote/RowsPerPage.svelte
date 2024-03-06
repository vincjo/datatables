<script lang="ts">
    import type { DataHandler, Row } from '$lib/remote'

    type T = $$Generic<Row>

    export let handler
    export let small = false
    export let options = [5, 10, 20]

    const rowsPerPage = handler.getRowsPerPage()

    const setRowsPerPage = () => {
        handler.setPage(1)
        if (handler.invalidate) handler.invalidate()
    }
</script>

<aside class={$$props.class ?? ''}>
    {#if !small}
        <span>{handler.i18n.show}</span>
    {/if}
    <select bind:value={$rowsPerPage} on:change={setRowsPerPage}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    {#if !small}
        <span>{handler.i18n.entries}</span>
    {/if}
</aside>

<style>
    aside {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 32px;
        color: #757575;
    }
    select {
        margin: 0 4px;
    }
</style>

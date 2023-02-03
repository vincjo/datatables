<script lang="ts">
    import type { DataHandler } from '$lib/core'
    export let handler: DataHandler

    const rowsPerPage = handler.getRowsPerPage()

    const options = [5, 10, 20, 50, 100]
</script>


<aside>
    <p>{handler.i18n.show}</p>
    <select bind:value={$rowsPerPage} on:change={() => handler.setPage(1)}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    <p>{handler.i18n.entries}</p>
</aside>


<style>
    aside{
        display:flex;
        justify-content:flex-start;
        align-items: center;
        height:32px;
        color:#616161;
    }
    select{
        margin:0 4px;
    }
</style>
<script lang="ts">
    import type { DataHandler } from '$lib/core'
    export let handler: DataHandler

    export let i18n =  { show: 'Show', entries: 'entries' } 

    const rowsPerPage = handler.getRowsPerPage()

    const options = [5, 10, 20, 50, 100]
</script>


<aside>
    <p>{i18n.show}</p>
    <select bind:value={$rowsPerPage}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    <p>{i18n.entries}</p>
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
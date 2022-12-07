<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler

    const rowsPerPage = handler.getRowsPerPage()
    
    const options = [5, 10, 20, 50, 100]
</script>


<aside>
    <p>Show&nbsp;</p>
    <select bind:value={$rowsPerPage}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    <p>&nbsp;entries</p>
</aside>


<style>
    aside{
        display:flex;
        justify-content:flex-start;
        align-items: center;
        height:32px;
        color:#616161;
    }
</style>
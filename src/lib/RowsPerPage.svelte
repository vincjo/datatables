<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler

    export let i18n = {} as { rowsPerPage: string } 
    const label = i18n.rowsPerPage ? i18n.rowsPerPage.split(' {rowsPerPage} ') : ['Show', 'entries']


    const rowsPerPage = handler.getRowsPerPage()

    const options = [5, 10, 20, 50, 100]
</script>


<aside class="rows-per-page">
    <p>{label[0]}&nbsp;</p>
    <select bind:value={$rowsPerPage}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    <p>&nbsp;{label[1]}</p>
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
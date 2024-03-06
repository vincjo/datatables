<script lang='ts'>
    import type { Column } from "./IDatatable"

    export let columns: Column[];
    export let row
    
</script>

{#each columns as column}
    <td>
       <slot cell={{field: column.field, value: row[column.field]}}/>
    </td>
{/each}

<style>
    td {
        padding: 3px 20px;
    }
</style>
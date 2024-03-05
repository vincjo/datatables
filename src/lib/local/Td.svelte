<script lang='ts'>
    import type { Column } from "./IDatatable"
    import type { Row } from './index'

    export let columns: Column[];
    export let row: Row;
    
</script>

{#each columns as column}
    <td>
        <!-- {@debug column} -->
       <slot cell={{field: column.field, value: row[column.field]}}/>
    </td>
{/each}

<style>
    td {
        padding: 3px 20px;
    }
</style>
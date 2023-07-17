export const doc = {

    "select": {
        abstract: `Add a value or a complete row in a writable store.`,
        usage: /*html*/`<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables'
    export let handler: DataHandler
    export let row: { id: number, last_name: string }
</script>


<input type="checkbox" 
    on:click={() => handler.select(row.id)}
/>

<input type="checkbox" 
    on:click={() => handler.select(row)}
/>`
    }
}
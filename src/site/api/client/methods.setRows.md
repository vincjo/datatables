

Set or update table rows.

## Usage

```svelte
<script lang="ts">
    import type { TableHandler } from '@vincjo/datatables'

    let { table, data }: { 
        table: TableHandler, 
        data: any[] 
    } = $props()

    $effect(() => { data; table.setRows(data) })
</script>
```
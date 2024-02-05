

Set or update data.

## Usage

```svelte
<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables'

    export let data
    export let handler: DataHandler

    $: data, handler.setRows(data)
</script>
```
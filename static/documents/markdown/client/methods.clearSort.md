


## Usage

```ts
table.clearSort()
```


When you update data using `table.setRows(data)`, the default behavior is to restore previous sorts.

To avoid it, you can use `table.clearSort()` before updating.

```svelte
<script lang="ts">
    $effect(() => { 
        data
        table.clearSort()
        table.setRows(data) 
    })
</script>
```
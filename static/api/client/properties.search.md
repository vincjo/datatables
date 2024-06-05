
The search is a general filter that applies to the entire dataset. It is possible to define a more precise search scope.

## Usage

```svelte
<input type="text" bind:value={table.search}>
```

## Using scope

```svelte
<script>
    table.searchScope = [
        'first_name',
        (row) => row.nested.prop
    ]
</script>

<input type="text" bind:value={table.search}>
```
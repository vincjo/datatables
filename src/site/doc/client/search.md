
The search is a general filter that applies to the entire dataset. It is possible to define a more precise search scope.

## Usage

```svelte
<script>
    let value = null

    handler.on('clearSearch', () => value = '')
</script>

<input type="text"
    bind:value
    on:input={() => handler.search(value)}
/>
```

## Using scope

```svelte
<script>
    const search = (value) => {
        handler.search(value, [
            'first_name',
            (row) => row.nested.prop
        ])
    }
</script>
```
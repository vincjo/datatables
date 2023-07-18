

## Usage

```svelte
<script>
    let value = null
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
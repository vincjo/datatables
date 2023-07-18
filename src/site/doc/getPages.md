
## Usage

```svelte
<script>
    const pages = handler.getPages()
</script>
```

## Return

```ts
$pages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// if param.ellipsis = true
$pages = [ 1, 2, 3, 4, 5, null, 10 ]

```



## Usage

```svelte
<script>
    const pages = handler.getPages()
    const pagesWithEllipsis = handler.getPages({ ellipsis: true })
</script>
```

## Return

```ts
$pages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

$pagesWithEllipsis = [ 1, 2, 3, 4, 5, null, 10 ]

```




Get the list of pages. 
A page is defined by its numbering (not by index). The first page is worth `1`.


## Usage

```svelte
<script>
    const pages = handler.getPages()
    const pagesWithEllipsis = handler.getPages({ ellipsis: true })
</script>
```

## Output

```ts
$pages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

$pagesWithEllipsis = [ 1, 2, 3, 4, 5, null, 10 ]

```


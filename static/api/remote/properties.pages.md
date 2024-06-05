

Get the list of pages. 
A page is defined by its numbering (not by index). The first page is worth `1`.


## Example

```svelte
<script>
    console.log(table.pages)
    console.log(table.pagesWithEllipsis)
</script>
```

## Output

```ts
table.pages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

table.pagesWithEllipsis = [ 1, 2, 3, 4, 5, null, 10 ]

```


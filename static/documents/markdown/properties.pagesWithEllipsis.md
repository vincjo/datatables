


Provides the list of pages with a dynamic ellipse represented by "null".


## Example

```ts
console.log(table.pagesWithEllipsis)
```

## Output

```ts
// table.currentPage = 1
table.pagesWithEllipsis = [ 1, 2, 3, 4, 5, null, 18 ]

// table.currentPage = 7
table.pagesWithEllipsis = [1, null, 6, 7, 8, null, 18]

// table.currentPage = 15
table.pagesWithEllipsis = [1, null, 14, 15, 16, 17, 18]
```


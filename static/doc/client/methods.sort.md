

Sorting direction is implicitly defined by TableHandler.
- 1st sort = ascending
- 2nd sort = descending
- 3rd sort = ascending
- ...



## Usage


```svelte
<button onclick={() => table.sort('email')}>
    Sort emails
</button>
```

## Working with nested props

```svelte
<button onclick={() => table.sort((row) => row.user.email)}>
    Sort emails
</button>
```
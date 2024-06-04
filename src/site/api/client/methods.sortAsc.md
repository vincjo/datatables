Ascending sort.

## Usage


```svelte
<button onclick={() => table.sortAsc('email')}>
    Sort emails
</button>
```

## Working with nested props

```svelte
<button onclick={() => table.sortAsc((row) => row.user.email)}>
    Sort emails
</button>
```
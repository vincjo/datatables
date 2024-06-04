Descending sort.

## Usage


```svelte
<button onclick={() => table.sortDesc('email')}>
    Sort emails
</button>
```

## Working with nested props

```svelte
<button onclick={() => table.sortDesc((row) => row.user.email)}>
    Sort emails
</button>
```
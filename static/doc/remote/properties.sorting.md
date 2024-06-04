
Sorting property provides field and direction of the current sort.

## Usage

```svelte
<script>
    const { field, direction } = $derived(table.sorting)
</script>

<button
    onclick={() => table.sort('email')}
    class:active={field === 'email'}
    class:asc={direction === 'asc'}
    class:desc={direction === 'desc'}
>
    Sort emails
</button>
```

## Output

```ts
table.sorting = {
    field: 'email',
    direction: 'desc'
}
```
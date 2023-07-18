

## Usage

```svelte
<script>
    const sort = handler.getSort()
</script>

<button
    on:click={() => handler.sort('email')}
    class:active={$sort.identifier === 'email'}
    class:asc={$sort.direction === 'asc'}
    class:desc={$sort.direction === 'desc'}
>
    Sort emails
</button>
```

## Return

```ts
const $sort = {
    identifier: 'email',
    direction: 'desc'
}

// In case 'orderBy' is a callback, 'identifier' becomes callback.toString()
const $sort = {
    identifier: '(row) => row.firstname + row.lastname',
    direction: 'asc'
}

// 'identifier' value is predictable
const identifier = orderBy?.toString()
```


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

## Output

```ts
const $sort = {
    identifier: 'email',
    direction: 'desc'
}
```

 In case you used a callback as Field<>, 'identifier' is equal to `callback.toString()`, unless you defined a specific identifier.

 ```ts
 const $sort = {
    identifier: '(row) => row.user.login_count',
    direction: 'asc'
}
 ```
In any case, the 'identifier' value is predictable:

```ts
const identifier = orderBy?.toString()
```
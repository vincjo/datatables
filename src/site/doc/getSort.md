

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
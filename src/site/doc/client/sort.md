

The sorting direction is implicitly defined by the DataHandler.
- 1st sort = ascending
- 2nd sort = descending
- 3rd sort = ascending
- ...



The `identifier` parameter is optional. It can be used in case of naming conflicts between columns.

## Usage


```svelte
<button on:click={() => handler.sort('email')}>
    Sort emails
</button>
```

## Working with nested props

```svelte
<button on:click={() => handler.sort((row) => row.user.email)}>
    Sort emails
</button>
```
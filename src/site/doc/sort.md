
The sort direction is implicitly handled by the DataHandler. 

- first sort = ascending

- second sort = descending

## Usage


```svelte
<button on:click={() => handler.sort('email')}>
    Sort emails
</button>
```
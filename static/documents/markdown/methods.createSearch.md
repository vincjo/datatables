Create a search filter.


## Usage
```ts
const search = table.createSearch()
```
```svelte
<input type="text" bind:value={search.value} oninput={() => search.set()}>
```

## Search scope

```ts
const search = table.createSearch(['last_name', 'first_name'])
// Search will only apply on 'last_name' and 'first_name' fields
```

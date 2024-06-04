

## Usage

```svelte
<input type="checkbox" 
    onclick={() => table.select(row)}
/>
```

<br>

🚨 If you select only a value of a unique key (ex: "row.id"), it is necessary to specify `selectBy` param at instantiation.

```ts
const table = new TableHandler(data, { selectBy: 'id', rowsPerPage: 10 })
```

```svelte
<input type="checkbox" 
    onclick={() => table.select(row.id)}
/>
```

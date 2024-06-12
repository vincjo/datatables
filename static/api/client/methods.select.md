

## Usage

1# Define the name of the key in `selectBy` parameter:
```ts
const table = new TableHandler(data, { selectBy: 'id' })
```

2# For each row:
```svelte
<input type="checkbox" onclick={() => table.select(row.id)}>
```


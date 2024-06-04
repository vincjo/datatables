

## Usage

```svelte

<input
    type="checkbox"
    checked={table.isAllSelected}
    onclick={() => table.selectAll()}
/>
```

## Selecting all rows accross pages

```ts
table.selectAll({ scope: 'all' })
```

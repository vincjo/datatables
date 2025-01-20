Create a new sort for 1 column.


## Usage
```ts
const sort = table.createSort('last_name')
```
```svelte
<th class={{ active: sort.isActive }}>
    <button onclick={() => sort.set()}>
        Last name
        <span class={[
            { asc: sort.direction === 'asc' }, 
            { desc: sort.direction === 'desc' }
        ]}>
        </span>
    </button>
</th>
```

## Working with nested props

```ts
const sort = table.createSort((row) => row.nested.prop)
```

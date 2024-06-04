
Get rows according to client side state.

## Usage

```svelte
<ul>
    {#each table.rows as row}
        <li>{row.first_name} {row.last_name}</li>
    {/each}
</ul>
```

## Output

```ts
table.rows = [
    { id: 1, frist_name: 'Jane', last_name: 'Doe' },
    ...
    { id: 150, first_name: 'John', last_name: 'Doe' }
]
```
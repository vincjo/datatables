


## Usage

```svelte
<tbody>
    {#each table.rows as row}
        <tr>
            <td>{row.first_name}</td> 
            <td>{row.last_name}</td>
            <td>{row.address}</td>
        </tr>
    {/each}
</tbody>
```

## Output

```ts
table.rows = [
    { id: 1, frist_name: 'Jane', last_name: 'Doe' },
    ...
    { id: 150, first_name: 'John', last_name: 'Doe' }
]
```
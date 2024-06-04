

## Usage

```svelte
<input 
    type="checkbox" 
    onclick={() => table.selectAll({ scope: 'all' })}
>

<input 
    type="checkbox" 
    onclick={() => table.selectAll({ scope: 'currentPage' })}
>
```

Default scope is "currentPage"

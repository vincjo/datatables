

## Usage

```svelte
<input 
    type="checkbox" 
    on:click={() => handler.selectAll({ scope: 'all' })}
/>

<input 
    type="checkbox" 
    on:click={() => handler.selectAll({ scope: 'currentPage' })}
/>
```


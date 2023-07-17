

## Usage

```svelte
<input 
    type="checkbox" 
    on:click={() => handler.selectAll()}
/>

<input 
    type="checkbox" 
    on:click={() => handler.selectAll({ selectBy: 'id', scope: 'currentPage' })}
/>
```
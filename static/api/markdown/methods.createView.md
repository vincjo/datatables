Create a table view to handle column visibility and frozen columns using DOM functions.

## Usage

### Column visibility
```ts
const view = table.createView([
    { index: 0, name: 'ID', isVisible: false },
    { index: 1, name: 'First name' },
    { index: 2, name: 'Last name' },
    { index: 3, name: 'Email' },
])
```

```svelte
{#each view.columns as column}
    <button type="button" 
        class:active={column.isVisible}
        onclick={() => column.toggle()}
    >
        {column.name}
    </button>
{/each}
```

### Freeze columns
```ts
table.createView([
    { index: 0, isFrozen: true },
    { index: 1, isFrozen: true },
])
```

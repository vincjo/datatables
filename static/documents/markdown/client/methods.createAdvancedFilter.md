
Create a multiple criteria filter.

## Usage
```ts
const filter = table.createAdvancedFilter('priority', check.isEqualTo)
```

```svelte
<button 
    onclick={() => filter.set('high')}
    class={{ active: filter.criteria.includes('high') }}
>High priority</button>

<button
    onclick={() => filter.set('low')}
    class={{ active: filter.criteria.includes('low') }}
>Low priority</button>
```
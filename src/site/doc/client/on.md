

## Usage

### `change` event

```svelte
<script>
    let element
    handler.on('change', () => element.scrollTop = 0)
</script>

<div bind:this={element} style:height="600px">
    <Datatable {handler}>
        [...]
    </Datatable>
</div>
```

### `clearFilters` event

```svelte
<script>
    let value = ''
    handler.on('clearFilters', () => value = '')
</script>

<input type="text" on:input={() => handler.filter(value, 'columnName')}/>
```
### `clearSearch` event

```svelte
<script>
    let value = ''
    handler.on('clearSearch', () => value = '')
</script>

<input type="text" on:input={() => handler.search(value)}/>
```
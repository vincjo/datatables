

## Usage

```svelte
<input type="checkbox" 
    on:click={() => handler.select(row.id)}
/>

<input type="checkbox" 
    on:click={() => handler.select(row)}
/>
```

<br>

🚨 If you select the value of a unique key instead of an entire row object, it is necessary to specify the name of this key at the `DataHandler` instantiation level.

```ts
const handler = new DataHandler(data, { selectBy: 'id', rowsPerPage: 10 })
```

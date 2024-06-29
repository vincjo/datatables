Lazy load your data by running your fetch function according to some table state parameters.

## Usage

The load method gives you access to the table state.
```ts
table.load((state: State) => myLoadFunction(state): Promise<Row[]> )
```

Your load function parses the state object to build an API request and must return a set of data.
```ts
table.load(async ({ rowsPerPage, offset, setRowsPerPage }: State) =>  {
    const response = await fetch(`https://myapi.com?limit=${rowsPerPage}&offset=${offset}`)
    return response.json()
})
```
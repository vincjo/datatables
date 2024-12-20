Lazy load data by running your own data fetching function according to some table state parameters.

## Usage

The load method gives you access to the table state.
```ts
table.load((state: State) => myLoadFunction(state): Promise<Row[]> )
```

Your data fetching function parses the state object to build an API request and returns a set of data.
```ts
table.load(async ({ rowsPerPage, offset }: State) =>  {
    const response = await fetch(`https://myapi.com?limit=${rowsPerPage}&offset=${offset}`)
    return response.json()
})
```

Returns the table state.

## Usage

```ts
table.getState()

// returns:
{
    currentPage: 3,
    rowsPerPage: 10,
    offset: 20,
    search: 'michel',
    sort: { field: 'age', direction: 'desc' },
    filters: [ { field: 'city', value: 'limoge' } ],
    setTotalRows: (value: number) => void
}
```
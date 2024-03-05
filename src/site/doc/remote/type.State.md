```ts
export type State = {
    currentPage: number,
    rowsPerPage: number,
    offset: number,
    search: string | undefined,
    sort: Sort<Row> | undefined
    filters: Filter<Row>[] | undefined
    setTotalRows: (value: number) => void
}
```

Datatable state in the client-side to compose API request with the proper params.

## Example

```ts
state = {
    currentPage: 3,
    rowsPerPage: 10,
    offset: 20,
    search: 'michel',
    sort: { orderBy: 'age', direction: 'desc' }
    filters: [ { filterBy: 'city', value: 'limoge' } ]
}
```


Allows you to compose this API request:

```bash
https://api.mysite.com/users?
    limit=10            # rows per page
    &offset=20          # offset (20 = page number 3)
    &q=michel           # full text search
    &city=limoge        # column filter: where "city" = 'limoge'
    &sort=age
    &order=desc         # order by "age" descending
```
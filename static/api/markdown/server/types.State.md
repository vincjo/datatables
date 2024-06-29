
Table state.

## Example

```ts
state = {
    currentPage: 3,
    rowsPerPage: 10,
    offset: 20,
    search: 'michel',
    sort: { field: 'age', direction: 'desc' }
    filters: [ { field: 'city', value: 'limoge' } ]
}
```


Interface with any API request:

```bash
https://api.mysite.com/users?
    limit=10            # rows per page
    &offset=20          # offset (20 = page number 3)
    &q=michel           # full text search
    &city=limoge        # column filter: where "city" = 'limoge'
    &sort=age
    &order=desc         # order by "age" descending
```
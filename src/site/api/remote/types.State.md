
Client-side table state to create API requests with the proper params.

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
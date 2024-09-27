# svelte-simple-datatables + Runes

- Basically, stores are replaced by runes, *getters()* by properties.
- `DataHandler` is named `TableHandler`


## Smooth transition from v1 to v2

In order to make the migration process a little easier, v1 is embed in “legacy” namespace so you will have the opportunity to upgrade your components progressively by simply modifying imports.

```diff
- @vincjo/datatables
+ @vincjo/datatables/legacy

- @vincjo/datatables/remote
+ @vincjo/datatables/legacy/remote
```

## Old vs new

### Svelte 4
```ts
import { DataHandler } from '@vincjo/datatables'

const handler = new DataHandler(data)
const rows = handler.getRows()
const pageNumber = handler.getPageNumber()
// $rows, $currentPage
```



### Svelte 5
```ts
import { TableHandler } from '@vincjo/datatables'

const table = new TableHandler(data)
// table.rows, table.currentPage
```

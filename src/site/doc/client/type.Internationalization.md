```ts
type Internationalization = {
    search?: string
    show?: string
    entries?: string
    filter?: string
    rowCount?: string
    noRows?: string
    previous?: string
    next?: string
}
```

Used to define the text displayed in showcase components.


## Example

```ts
const i18n = {
    search: 'Search...',
    show: 'Show', 
    entries: 'lines',
    filter: 'Filter',
    rowCount: 'Showing {start} to {end} of {total} entries',
    noRows: 'No entries to found',
    previous: 'Previous', 
    next: 'Next'
}
```
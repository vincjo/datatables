<div align="center">
    <img align="center" src="./static/logo.svg" alt="logo" width="172"/>
    <p align="center">
        <h1 align="center" style="font-size:32px;margin:0;border:none;">svelte simple datatables</h1>
        <p style="color:#eee">A toolkit for creating datatable components with Svelte</p>
        <img src="https://img.shields.io/npm/v/@vincjo/datatables?color=%23c2185b" alt="npm version"/>
        <img src="https://img.shields.io/github/license/vincjo/datatables?color=c2185b" alt="last commit"/>
    </p>
</div>

# Presentation

This lib provides an API to dynamically interact with iterable data on the client-side: filtering, paging, sorting, selecting...

-   **Headless** by design <br>
-   **Typescript** support <br>
-   **SSR** friendly
-   no dependencies

Also provides some showcase components, which you can grab and customize in your own project.


:globe_with_meridians: **[Live examples](https://vincjo.fr/datatables/examples)**

<br>

### <img src="./static/logo-remote.svg" alt="logo" style="float:left;padding-right:8px" width="48"/> <span style="line-height:48px">Server-side data processing</span>

Support for server-side pagination, sort, filters is located in `@vincjo/datatables/remote` namespace.

:globe_with_meridians: **[Basic usage](https://vincjo.fr/datatables/remote/basic-usage)**





<br>

# Install

```apache
npm i -D @vincjo/datatables
```


# Sample code

```svelte
<script lang="ts">
    import { DataHandler } from '@vincjo/datatables'
    import { someData } from './data'

    const handler = new DataHandler(someData, { rowsPerPage: 50 })
    const rows = handler.getRows()
</script>

<table>
    <thead>
        <tr>
            <th>First name</th>
            <th>Last name</th>
        </tr>
    </thead>
    <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
            </tr>
        {/each}
    </tbody>
</table>
```

### :globe_with_meridians: [See full documentation](https://vincjo.fr/datatables)

<br>

# DataHandler methods

```ts
getRows(): Readable<Row[]>
setRows( data: Row[] ): void
```

```ts
sort( orderBy: OrderBy<Row> ): void
sortAsc( orderBy: OrderBy<Row> ): void
sortDesc( orderBy: OrderBy<Row> ): void
getSorted(): Writable<(Order<Row>)>
applySorting( params: { orderBy?: OrderBy<Row>, direction?: 'asc' | 'desc'} = null ): void
```

```ts
filter( value: string, filterBy: FilterBy<Row>, comparator: Comparator<Row> ): void
clearFilters(): void
```

```ts
search( value: string, scope?: (keyof Row)[] ): void
clearSearch(): void
```

```ts
getRowsPerPage(): Writable<number | null>
```

```ts
getRowCount(): Readable<{ total: number; start: number; end: number; }>
```

```ts
getPages( param: { ellipsis: boolean } ): Readable<number[]>
getPageCount(): Readable<number>
getPageNumber(): Readable<number>
setPage( value: number | ‘previous’ | ‘next’ ): void
```

```ts
select(value: Row[] | (Row[keyof Row])[]): void
getSelected(): Writable<Row[] | (Row[keyof Row])[]>
selectAll(params: { selectBy?: keyof Row, scope?: 'all' | 'currentPage' } = { scope: 'all' }): void
isAllSelected(): Readable<boolean>
```

```ts
getTriggerChange(): Writable<number>
```

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

This lib provides an API to dynamically interact with iterable data: filtering, paging, sorting, selecting...

- **Headless** by design <br>
- **Typescript** support <br>
- **SSR** friendly
- no dependencies

Also provides some demo components, which you can grab and customize in your own project.

<br>

:globe_with_meridians: **[Live examples](https://vincjo.fr/datatables/examples)**

<br>

# Install

```apache
npm i -D @vincjo/datatables
```

# Sample code

```svelte
<script lang="ts">
  import { DataHandler } from '@vincjo/datatables';
  import { someData } from './data';

  const handler = new DataHandler(someData, { rowsPerPage: 50 });
  const rows = handler.getRows();
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
getRows(): Readable<any[]>
setRows( data: any[] ): void
```

```ts
sort( orderBy: Function | string ): void
sortAsc( orderBy: Function | string ): void
sortDesc( orderBy: Function | string ): void
getSorted(): Writable<{ identifier?: string; direction?: 'asc' | 'desc'; }>
applySorting( params: {orderBy: Function | string; direction?: 'asc' | 'desc'} = null ): void
```

```ts
filter( value: string, filterBy: Function | string, comparator: Function = null ): void
clearFilters(): void
```

```ts
search( value: string, scope?: string[] ): void
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
select(value: any): void
getSelected(): Writable<any[]>
selectAll(params: { selectBy?: Function | string, scope?: 'all' | 'currentPage' } = { scope: 'all' }): void
isAllSelected(): Readable<boolean>
```

```ts
getTriggerChange(): Writable<number>
```

<div align="center">
    <img align="center" src="./static/logo.svg" alt="logo" width="172"/>
    <p align="center">
        <h1 align="center" style="font-size:32px;margin:0;border:none;">svelte simple datatables</h1>
        <p style="color:#eee">A powerful toolkit for building datatable components.</p>
        <img src="https://img.shields.io/badge/svelte-runes-v2?color=%23c2185b" alt="any text"/>
        <img src="https://img.shields.io/github/license/vincjo/datatables?color=c2185b" alt="last commit"/>
    </p>
</div>



# Docs
Streamline your data workflow with a robust API providing advanced features while reducing code complexity.

:globe_with_meridians: **[vincjo.fr/datatables](https://vincjo.fr/datatables)**



# Install

```apache
npm i -D @vincjo/datatables
```


# Smooth transition from v1 to v2

In order to make the migration process a little easier, v1 is embed in “legacy” namespace so you will have the opportunity to upgrade your components progressively by simply modifying imports.

```diff
- @vincjo/datatables
+ @vincjo/datatables/legacy

- @vincjo/datatables/remote
+ @vincjo/datatables/legacy/remote
```
<br>


# Sample code

```svelte
<script lang="ts">
    import { TableHandler } from '@vincjo/datatables'
    import { someData } from './data'

    const table = new TableHandler(someData, { rowsPerPage: 50 })
</script>

<table>
    <thead>
        <tr>
            <th>First name</th>
            <th>Last name</th>
        </tr>
    </thead>
    <tbody>
        {#each table.rows as row}
            <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
            </tr>
        {/each}
    </tbody>
</table>
```




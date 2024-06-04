<div align="center">
    <img align="center" src="./static/logo.svg" alt="logo" width="172"/>
    <p align="center">
        <h1 align="center" style="font-size:32px;margin:0;border:none;">svelte simple datatables</h1>
        <p style="color:#eee">A toolkit for creating datatable components with Svelte</p>
        <img src="https://img.shields.io/badge/v2-runes-v2?color=%23c2185b" alt="any text"/>
        <img src="https://img.shields.io/github/license/vincjo/datatables?color=c2185b" alt="last commit"/>
    </p>
</div>

# Experimental support for Svelte 5 - Runes




:globe_with_meridians: **[vincjo.fr/datatables.next](https://vincjo.fr/datatables.next)**




<br>

# Install

```apache
npm i -D @vincjo/datatables@runes
```


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

### :globe_with_meridians: [Documentation](https://vincjo.fr/datatables.next)



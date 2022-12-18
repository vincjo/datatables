<div align="center">
    <img align="center" src="./src/assets/logo.svg" alt="logo" width="172"/>
    <p align="center">
        <h1 align="center" style="font-size:32px;margin:0;border:none;">svelte-simple-datatables</h1>
        <img src="https://img.shields.io/npm/v/@vincjo/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
        <img src="https://img.shields.io/github/license/vincjo/datatables?color=b71540" alt="last commit"/>
    </p>
</div>





# Presentation

This package provides an API to handle data and related events :
- rows,
- filters,
- pagination,
- search,
- sort...

Also provides some sample components, which you can grab and customize in your own project.
<br><br>
:white_check_mark: Headless by design <br>
:white_check_mark: **Typescript** support <br>
:white_check_mark: Full **SSR** compatibility


<br>

:point_right: **[Live examples](https://vincjo.fr/svelte-simple-datatables/datatables)**


<br>

# Install
````apache
npm i -D @vincjo/svelte-simple-datatables
````


# Sample code
````svelte
<script lang="ts">
    import { DataHandler, Datatable } from '@vincjo/svelte-simple-datatables'
    import { someData } from './data'

    const handler = new DataHandler(someData, { rowsPerPage: 50 })
    const rows = handler.getRows()
</script>

<Datatable {handler}>
    <!-- html table -->
</Datatable>
````
### [See full documentation here](https://vincjo.fr/svelte-simple-datatables) 
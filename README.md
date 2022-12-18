<div align="center">
	<img align="center" src="./src/assets/logo.svg" alt="logo" width="172"/>
	<p align="center">
		<h1 align="center" style="font-size:32px;margin:0;border:none;">next-datatables</h1>
		<img src="https://img.shields.io/npm/v/@vincjo/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
		<img src="https://img.shields.io/github/license/vincjo/datatables?color=b71540" alt="last commit"/>
	</p>
</div>





# Presentation

## :warning: svelte-simple-datatable is now 1.0.0
There are massive breaking changes. For previous version `0.2.26` see :
- Documentation : [old site](https://vincjo.fr/svelte-simple-datatables/legacy)
- Install : ````npm install -D svelte-simple-datatable@0.2.6````

## 1.0.0 release
This package provides a complete API to handle data and all related events :
- filters,
- pagination,
- search,
- sort

Also provides some sample components, which you can grab and customize in your own project.
<br><br>
:white_check_mark: **Typescript** support <br>
:white_check_mark: **SSR** compatibility


<br>

:point_right: **[Live Demo](https://vincjo.fr/svelte-simple-datatables)**


<br>

# Install 
````apache
npm i -D svelte-simple-datatables
````


# Sample code
The DataHandler handles all data events.
The only parametter is `rowsPerPage: number`. If not given, no pagination.
````svelte
<script>
    import { DataHandler } from 'svelte-simple-datatables' 
    import { someData } from './data/sample.json 

    const handler = new DataHandler(someData, { rowsPerPage: 50 })

    const rows = handler.getRows()
</script>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>IP Adress</th>
        </thead>
    </tr>
    <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.ip_address}</td>
            </tr>
        {/each}
    </tbody>
</table>
````
# Sorting & filtering
````svelte
<thead>
    <!-- SORTING -->
    <tr>
        <th on:click={() => handler.sort('id')}>ID</th>
        <!-- using a callback -->
        <th on:click={() => handler.sort(row => row.first_name + row.lastname)}>
            Name
        </th>
    </tr>

    <!-- FILTERING -->
    <tr>
        <th>
            <input type="text" on:input={() => handler.filter('id')}/>
        </th>
        <!-- using a callback -->
        <th>
            <input type="text" on:input={() => handler.filter(row => row.first_name + row.lastname)}/>
        </th>
    </tr>
</thead>
````

# Searching
````svelte
<script lang="ts">
    import type DataHandler from 'svelte-simple-datatables'
    export let handler: DataHandler
    let value = ''
</script>

<input
    bind:value={value} 
    placeholder="Search..."
    on:input={() => handler.search(value)}
/>
````

# Rows per page
````svelte
<script lang="ts">
    import type DataHandler from 'svelte-simple-datatables'
    export let handler: DataHandler

    const rowsPerPage = handler.getRowsPerPage()

    const options = [5, 10, 20, 50, 100]
</script>


<select bind:value={$rowsPerPage}>
    {#each options as option}
        <option value={option}>
            {option}
        </option>
    {/each}
</select>
````

# Row count
````svelte
<script lang="ts">
    import type DataHandler from 'svelte-simple-datatables'
    export let handler: DataHandler

    const rowCount = handler.getRowCount()
</script>


{#if $rowCount.total > 0}
    Showing {$rowCount.start}
    to {$rowCount.end}
    of {$rowCount.total} entries
{:else}
    No entries to found
{/if}
````


# Pagination (with ellipse)
````svelte
<script lang="ts">
    import type DataHandler from 'svelte-simple-datatables'
    export let handler: DataHandler
    const pageNumber = handler.getPageNumber()
    const pageCount  = handler.getPageCount()
    const pages      = handler.getSlicedPages() 
</script>

<button type="button"
    class:disabled={$pageNumber === 1}
    on:click={() => handler.setPage('previous')}
>
    Previous
</button>

{#each $pages as pageValue}
    <button type="button"
        class:active={$pageNumber === pageValue}
        class:ellipse={pageValue === null}
        on:click={() => handler.setPage(pageValue)}
    >
        {pageValue ?? '...'}
    </button>
{/each}

<button type="button"
    class:disabled={$pageNumber === $pageCount}
    on:click={() => handler.setPage('next')}
>
    Next
</button>

````
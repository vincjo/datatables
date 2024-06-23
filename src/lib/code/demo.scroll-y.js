export const code = (rowsPerPage, scrollY) => {

if (scrollY) {
    return `
<script>
    import { data } from './data.example.js'  
    import { Datatable } from 'svelte-simple-datatables'
    const settings = { 
        rowsPerPage: ${rowsPerPage},
        scrollY: ${scrollY},
        columnFilter: true 
    }
    let rows
</script>

<section>
    <Datatable {settings} {data} bind:dataRows={rows}>
        <thead>
            <th data-key="id">ID</th>
            <th data-key="first_name">First Name</th>
            <th data-key="last_name">Last Name</th>
            <th data-key="email">Email</th>
        </thead>
        <tbody>
        {#if rows}
            {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
            </tr>
            {/each}
        {/if}
        </tbody>
    </Datatable>   
</section>

<style>
    section{width:720px;height:560px;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>
`
}
else {
    return `
<script>
    import { data } from './data.example.js'  
    import { Datatable, ColumnFilterInputs } from 'svelte-simple-datatables'
    const settings = { 
        rowsPerPage: ${rowsPerPage},
        scrollY: ${scrollY}
    }
    let rows
</script>

<section>
    <Datatable {settings} {data} bind:dataRows={rows}>
        <thead>
            <tr>
                <th class="sortable asc desc" data-key="id">ID <span/></th>
                <th class="sortable asc desc" data-key="first_name">First Name<span/></th>
                <th class="sortable asc desc" data-key="last_name">Last Name<span/></th>
                <th class="sortable asc desc" data-key="email">Email<span/></th>
            </tr>
            <ColumnFilterInputs/>
        <tbody>
        {#if rows}
            {#each $rows as row}
            <tr>
                <td>{row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
            </tr>
            {/each}
        {/if}
        </tbody>
    </Datatable> 
</section>

<style>
    th:first-child{width:72px;}
    th {
        padding: 8px 0px 8px 16px;
        text-align: center;
        border-bottom: 1px solid #eee;
        background: #fff;
    }
    th.sortable {
        cursor: pointer;
    }
    th.sortable span {
        padding-right: 16px;
        position: relative;
    }
    th.sortable span:before,
    th.sortable span:after {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        right: 0;
        top: 50%;
        position: absolute;
        width: 0;
    }
    th.sortable span:before {
        border-bottom-color: #e0e0e0;
        margin-top: -9px;
    }
    th.sortable span:after {
        border-top-color: #e0e0e0;
        margin-top: 1px;
    }
    th.sortable.asc:not(.desc) span:before {
        border-bottom-color: #9e9e9e;
    }
    th.sortable.desc:not(.asc) span:after {
        border-top-color: #9e9e9e;
    }
    td{text-align:center;padding:4px 0}
</style>
`
    }
}
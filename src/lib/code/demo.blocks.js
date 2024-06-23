export const code = (searchInput, paginationButtons, paginationRowCount, blocks) => {
    return `
<script>
    import { data } from './data.example.js'  
    import { Datatable${blocks} } from 'svelte-simple-datatables'
    const settings = {
        blocks: {
            searchInput: ${searchInput}, 
            paginationButtons: ${paginationButtons},
            paginationRowCount: ${paginationRowCount},
        }
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
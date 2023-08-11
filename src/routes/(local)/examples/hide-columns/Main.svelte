<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/local'
    import { onMount } from 'svelte'
    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()

    let element: HTMLElement

    const columns = handler.createColumnVisibility([
        { name: 'First Name', index: 0 },
        { name: 'Last Name' , index: 1 }
    ])
    onMount(() => columns.bind(element))
</script>

<button on:click={() => columns.toggle('Last Name')}>Click me</button>

<Datatable {handler}>
    <table bind:this={element}>
        <thead>
            <tr>
                <Th {handler} orderBy="first_name">First Name</Th>
                <Th {handler} orderBy="last_name">Last Name</Th>
                <Th {handler} orderBy="email">Email</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="first_name"/>
                <ThFilter {handler} filterBy="last_name" />
                <ThFilter {handler} filterBy="email"/>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>


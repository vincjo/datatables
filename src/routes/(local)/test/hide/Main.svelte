<script lang="ts">
    import myData from '$data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib'

    const handler = new DataHandler(myData, { rowsPerPage: 10 })
    const rows = handler.getRows()
    let visible = true

</script>

<button on:click={() => visible = !visible}>Visible : {visible}</button>

<section class:small={!visible}>

    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <Th {handler} orderBy="first_name">First Name</Th>

                    {#if visible}
                        <Th {handler} orderBy="last_name">Last Name</Th>
                        <Th {handler} orderBy="email">Email</Th>
                    {/if}

                </tr>
                <tr>
                    <ThFilter {handler} filterBy="first_name"/>

                    {#if visible}
                        <ThFilter {handler} filterBy="last_name" />
                        <ThFilter {handler} filterBy="email"/>
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.first_name}</td>

                        {#if visible}
                            <td>{row.last_name}</td>
                            <td>{row.email}</td>
                        {/if}

                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>

</section>

<style>
    section {
        margin: 24px auto;
        width: 560px;
        font-size: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #fff;
        transition: width, 0.1s;
    }
    section.small {
        width: 280px;
    }
    button {
        background: var(--secondary);
        color: #fff;
        font-weight:bold;
        padding: 8px;
    }
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>

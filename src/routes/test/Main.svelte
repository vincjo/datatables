<script lang="ts">
    import myData from '$data/data';
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/core';

    const handler = new DataHandler(myData, { rowsPerPage: 10 });
    const rows = handler.getRows();
</script>

<Datatable {handler} class="datatable">
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="first_name">First Name</Th>
                <Th {handler} orderBy="last_name">Last Name</Th>
                <Th {handler} orderBy="email">Email</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="first_name" />
                <ThFilter {handler} filterBy="last_name" />
                <ThFilter {handler} filterBy="email" />
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

<style>
    :global(.datatable footer) {
        border-radius: 0 0 8px 8px;
    }
    :global(.datatable header) {
        border-radius: 8px 8px 0 0;
    }
    :global(.datatable *) {
        color: #e0e0e0 !important;
        background: #212121;
        border-color: #616161 !important;
    }
    :global(.datatable * button:hover) {
        background: #424242 !important;
    }
    :global(.datatable button.active) {
        background: #000 !important;
    }
    :global(.datatable tbody tr:hover td) {
        transition: all, 0.2s;
        background: #000;
    }
    :global(.datatable article::-webkit-scrollbar-track) {
        background: #616161;
    }
    :global(.datatable article::-webkit-scrollbar-thumb) {
        background: #000;
    }
    :global(.datatable article::-webkit-scrollbar-thumb:hover) {
        background: #424242;
    }
    tbody td {
        border: 1px solid #333;
        padding: 4px 20px;
    }
</style>

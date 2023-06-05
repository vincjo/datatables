<script lang="ts">
    import myData from '$data/data';
    import { DataHandler, check, Datatable, Th, ThFilter } from '$lib/core';

    const handler = new DataHandler(myData, { rowsPerPage: 50 });
    const rows = handler.getRows();
    const selected = handler.getSelected();
    const isAllSelected = handler.isAllSelected();
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    <input
                        type="checkbox"
                        on:click={() => handler.selectAll({ selectBy: 'id' })}
                        checked={$isAllSelected}
                    />
                </th>
                <Th {handler} orderBy="id">id</Th>
                <Th {handler} orderBy="first_name">first_name</Th>
                <Th {handler} orderBy="last_name">last_name</Th>
                <Th {handler} orderBy="email">email</Th>
            </tr>
            <tr>
                <th class="selection" />
                <ThFilter {handler} filterBy="id" comparator={check.isEqualTo} />
                <ThFilter {handler} filterBy="first_name" />
                <ThFilter {handler} filterBy="last_name" />
                <ThFilter {handler} filterBy="email" />
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr class:active={$selected.includes(row.id)}>
                    <td class="selection">
                        <input
                            type="checkbox"
                            on:click={() => handler.select(row.id)}
                            checked={$selected.includes(row.id)}
                        />
                    </td>
                    <td>{@html row.id}</td>
                    <td>{@html row.first_name}</td>
                    <td>{@html row.last_name}</td>
                    <td>{@html row.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: #fff;
    }
    thead th.selection {
        width: 48px;
        padding-left: 8px;
        border-bottom: 1px solid #e0e0e0;
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
    tbody tr.active {
        background: var(--primary-lighten-1);
    }
    tbody tr.active:hover {
        background: var(--primary-lighten-2);
    }
    td :global(b) {
        font-weight: normal;
        color: #bdbdbd;
        font-family: JetBrains;
        font-size: 11px;
    }
    td.selection {
        padding-left: 24px;
    }
</style>

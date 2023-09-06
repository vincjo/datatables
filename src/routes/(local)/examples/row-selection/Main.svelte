<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, check, Datatable, Th, ThFilter } from '$lib/local'

    const handler = new DataHandler(myData, { rowsPerPage: 50 })
    const rows = handler.getRows()
    const selected = handler.getSelected()
    const isAllSelected = handler.isAllSelected()
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    <input
                        type="checkbox"
                        on:click={() => handler.selectAll({ selectBy: 'id', scope: 'currentPage' })}
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
    tbody tr.active {
        background: var(--primary-lighten-1);
    }
    tbody tr.active:hover {
        background: var(--primary-lighten-2);
    }
    td.selection {
        padding-left: 24px;
    }
</style>

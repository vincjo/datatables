<script lang="ts">
    import { TableHandler, Datatable, type State } from '$lib/src/server'
    import { reload } from './api'
    let { data }: { data: any[]} = $props()
    const table = new TableHandler(data, { rowsPerPage: 10, selectBy: 'id' })

    table.load((state: State) => reload(state))
</script>

<Datatable {table}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    <input
                        type="checkbox"
                        onclick={() => table.selectAll()}
                        checked={table.isAllSelected}
                    />
                </th>
                <th>Name</th>
                <th>Tagline</th>
                <th>Brewers tips</th>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
                <tr class:active={table.selected.includes(row.id)}>
                    <td class="selection">
                        <input
                            type="checkbox"
                            onclick={() => table.select(row.id)}
                            checked={table.selected.includes(row.id)}
                        />
                    </td>
                    <td>
                        <aside class="flex">
                            <img src={row.image_url} alt="beer" />
                            <b>{row.name}</b>
                        </aside>
                    </td>
                    <td>{row.tagline}</td>
                    <td style:font-size="12px">{row.brewers_tips}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: #fff;
    }
    th {
        text-align: left;
        padding: 8px 16px;
        color: #424242;
        border-bottom: 1px solid #e0e0e0;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 16px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    img {
        height: 40px;
        min-width: 40px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid var(--r-secondary);
        margin-right: 16px;
    }
    b {
        color: var(--r-primary);
        font-weight: normal;
        line-height: 16px;
    }
    tbody tr.active {
        background: var(--primary-lighten-1);
    }
    tbody tr.active:hover {
        background: var(--primary-lighten-2);
    }

</style>

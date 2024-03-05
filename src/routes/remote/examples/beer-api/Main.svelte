<script lang="ts">
    import { DataHandler, Datatable, type State } from '$lib/remote'
    import { reload } from './api'
    export let data: any[]

    const handler = new DataHandler(data, { rowsPerPage: 10, selectBy: 'id' })
    const rows = handler.getRows()

    handler.setRemoteControl((state: State) => reload(state))

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
                        on:click={() => handler.selectAll()}
                        checked={$isAllSelected}
                    />
                </th>
                <th>Name</th>
                <th>Tagline</th>
                <th>Brewers tips</th>
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

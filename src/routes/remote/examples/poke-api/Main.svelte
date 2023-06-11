<script lang="ts">
    import { DataHandler, Datatable, type State } from '$lib/remote'
    import { reload } from './api'
    import PokemonStats from './PokemonStats.svelte'
    import PokemonTypes from './PokemonTypes.svelte'

    const handler = new DataHandler([], { rowsPerPage: 10 })
    const rows = handler.getRows()

    handler.onChange( (state: State) => reload(state) )

    handler.invalidate()
</script>

<Datatable {handler} search={false}>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Base stats</th>
                <th>Height / Weight</th>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>
                        <aside class="flex">
                            {#if row.sprite}
                                <img src="{row.sprite}" alt="sprite" />
                            {/if}
                            <b>{row.name}</b>
                        </aside>
                    </td>
                    <td>
                        <PokemonTypes types={row.types}/>
                    </td>
                    <td>
                        <PokemonStats stats={row.stats}/>
                    </td>
                    <td>
                        {(row.height / 10)}m / {row.weight}kg
                    </td>
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
        padding: 2px 16px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    img {
        height: 72px;
        width: 72px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
    b {
        color: var(--r-primary);
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
</style>

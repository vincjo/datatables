<script lang="ts">
    import { TableHandler, Datatable, Th, RowCount, RowsPerPage, Pagination, type State } from '$lib/src/server'
    import { reload } from './api'
    import PokemonStats from './PokemonStats.svelte'
    import PokemonTypes from './PokemonTypes.svelte'

    const table = new TableHandler([], { rowsPerPage: 10 })

    table.load( (state: State) => reload(state) )
    table.invalidate()
</script>

<Datatable {table}>
    {#snippet header()}
        <div></div>
        <RowsPerPage {table} options={[5, 10, 20, 30, 50]}/>
    {/snippet}
    <table>
        <thead>
            <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Base stats</Th>
                <Th>Height / Weight</Th>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
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
    {#snippet footer()}
        <RowCount {table}/>
        <Pagination {table}/>
    {/snippet}
</Datatable>


<style>
    img {
        height: 72px;
        width: 72px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
    b {
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
</style>

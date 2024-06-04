<script lang="ts">
    import { TableHandler, Datatable, Th, type State } from '$lib/remote'
    import { reload } from './api'
    import PokemonStats from './PokemonStats.svelte'
    import PokemonTypes from './PokemonTypes.svelte'

    const table = new TableHandler([], { rowsPerPage: 10 })

    table.setRemoteControl( (state: State) => reload(state) )
    table.invalidate()
</script>

<Datatable basic {table}>
    <table>
        <thead>
            <tr>
                <Th {table}>ID</Th>
                <Th {table}>Name</Th>
                <Th {table}>Type</Th>
                <Th {table}>Base stats</Th>
                <Th {table}>Height / Weight</Th>
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

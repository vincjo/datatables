<script lang="ts">
    import { type DataHandler, Datatable, Th } from '$lib/client'
    import PokemonStats from './MCF_PokemonStats.svelte'
    export let handler: DataHandler
    const rows = handler.getRows()

    const sumStats = (stats: [name: string, value: number][]) => {
        return stats
            .map(([_, value]) => value)
            .reduce((acc, curr) => acc + curr)
    }
</script>


<Datatable basic {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">ID</Th>
                <Th {handler} orderBy="name">Name</Th>
                <Th {handler} orderBy="type">Type</Th>
                <Th {handler} orderBy={(row) => sumStats(row.stats)}>Base stats</Th>
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
                    <td>{row.type}</td>
                    <td>
                        <PokemonStats stats={row.stats}/>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: var(--bg);
    }
    img {
        height: 64px;
        width: 64px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
    b {
        color: var(--primary);
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
</style>
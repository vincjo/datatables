<script lang="ts">
    import { type TableHandler, Datatable, ThSort } from '$lib/client'
    import PokemonStats from './MCF_PokemonStats.svelte'
    type Props = { table: TableHandler }
    let { table }: Props = $props()

    const sumStats = (stats: [name: string, value: number][]) => {
        return stats
            .map(([_, value]) => value)
            .reduce((acc, curr) => acc + curr)
    }
</script>


<Datatable basic {table}>
    <table>
        <thead>
            <tr>
                <ThSort {table} field="id">ID</ThSort>
                <ThSort {table} field="name">Name</ThSort>
                <ThSort {table} field="type">Type</ThSort>
                <ThSort {table} field={(row) => sumStats(row.stats)}>Base stats</ThSort>
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
        height: 56px;
        width: 56px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
    b {
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
        text-transform: capitalize;
    }
</style>
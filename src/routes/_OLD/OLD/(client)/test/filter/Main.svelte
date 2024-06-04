<script lang="ts">
    import { Dropdown } from 'gros/dropdown'
    import { DataHandler, Datatable, Th } from '$lib/local'
    import PokemonStats from './PokemonStats.svelte'
    import { pokedex } from '$site/data/pokedex'
    const handler = new DataHandler(pokedex, { rowsPerPage: 10 })
    const rows = handler.getRows()
    const distinct = handler.createCalculation('type').distinct((values) => {
        return values
            .map((value: string) => value.split(' / ') )
            .flat()
            .filter(Boolean)
    })
    const filter = handler.createAdvancedFilter('type')
    const selected = filter.getSelected()

    const avg = handler.createCalculation('height').avg((values) => values.map(value => value / 10))
</script>

<Dropdown preventClosing>
    <button class="open btn">Type Filter</button>
    <aside slot="content" class="z-depth-2 thin-scrollbar">
        {#each distinct as type}
            {@const { value, count } = type}
            <button on:click={() => filter.set(value)} class="btn">
                <i class="micon">
                    {$selected.includes(value) ? 'check' : 'check_box_outline_blank'}
                </i>
                <span>{value}</span>
                <code>{count}</code>
            </button>
        {/each}
    </aside>
</Dropdown>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">ID</Th>
                <Th {handler} orderBy="name">Name</Th>
                <Th {handler} orderBy="type">Type</Th>
                <Th {handler} orderBy="stats">Base stats</Th>
                <Th {handler} orderBy="height">Height [avg={$avg}m]</Th>
                <Th {handler} orderBy="weight">Weight</Th>
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
                    <td>{(row.height / 10)}m</td>
                    <td>{row.weight}kg</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>


<style>
    thead {
        background: #fff;
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
        height: 64px;
        width: 64px;
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
    button.open {
        float: top;
        padding: 8px;
        width: 184px;
        background: #fff;
        text-align: left;
        color: #424242;
        border: 2px dotted #e0e0e0;

    }
    aside {
        position: relative;
        overflow-y: auto;
        max-height: 280px;
        border: 1px solid #e0e0e0;
        margin-top: 4px;
        border-radius: 4px;
        width: 184px;
        background: #fff;
    }
    aside button {
        justify-content: flex-start;
        width: 100%;
    }
    aside button span {
        width: 96px;
        text-align: left;
    }
    aside button i {
        font-size: 18px;
        margin-right: 8px;
    }
</style>
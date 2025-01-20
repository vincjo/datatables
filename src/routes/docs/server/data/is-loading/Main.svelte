<script lang="ts">
    import { TableHandler, Datatable, Th, RowCount, Pagination, type State } from '$lib/src/server'
    import { reload, initial } from './api'
    import { RingLoader } from 'gros/loading'

    const table = new TableHandler(initial, { rowsPerPage: 5 })

    table.load((state: State) => reload(state))
    table.invalidate()
</script>

<section class="bg-darken">

    <h1>is loading: <span>{table.isLoading}</span></h1>

    <Datatable {table}>
        <div class={[ 'spin', 'flex', { active: table.isLoading }]}><RingLoader size="96" color="var(--secondary)" unit="px" duration="0.8s"/></div>
        <table>
            <thead>
                <tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Height / Weight</Th>
                </tr>
            </thead>
            <tbody class={{ loading: table.isLoading }}>
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
                        <td>{(row.height / 10)}m / {row.weight}kg</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        {#snippet footer()}
            <RowCount {table}/>
            <Pagination {table}/>
        {/snippet}
    </Datatable>
</section>


<style>
    section {
        border-radius: 8px;
        border: 1px solid var(--grey);
        width: 480px;
        margin-bottom: 96px;
        min-height: 320px;
    }
    tbody.loading {
        opacity: 0.2;
    }
    img {
        height: 40px;
        width: 40px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 16px;
    }
    b {
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
    div.spin {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
        justify-content: center;
    }
    div.spin.active {
        display: flex;
    }
    h1 {
        color: var(--secondary);
        margin: 8px 16px;
        font-size: 18px;
        font-family: Archivo;
    }
    h1 span {
        font-family: JetBrains;
        color: var(--primary);
        font-weight: bold;
    }
</style>

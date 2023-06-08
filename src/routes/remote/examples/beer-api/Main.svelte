<script lang="ts">
    import { DataHandler, Datatable, type State } from '$lib/remote'

    export let data: any[]

    const handler = new DataHandler(data, { rowsPerPage: 5 })
    const rows = handler.getRows()

    // setPage event
    handler.on('navigate', async (state: State) => {

        const { pageNumber, rowsPerPage, search } = state

        const searchParam = search ? `&beer_name=${search}` : ''
        const response = await fetch(
            'https://api.punkapi.com/v2/beers' +
                `?page=${pageNumber}` +
                `&per_page=${rowsPerPage}` +
                `${searchParam}`
        )
        return response.json()
    })

    // setRowsPerPage event, triggers "navigate"
    handler.on('display', () => { handler.setPage(1) })

    // search event, triggers "navigate"
    handler.on('search', () => { handler.setPage(1) })
</script>

    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tagline</th>
                    <th>Brewers tips</th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
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
</style>

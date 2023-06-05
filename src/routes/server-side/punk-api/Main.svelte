<script lang="ts">
    import myData from '$data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/core'

    let rows = []
    const load = async () => {
        const response = await fetch('https://api.punkapi.com/v2/beers?page=35&per_page=5')
        const json = await response.json()
        rows = json
    }
</script>

{#await load()}
    <span />
{:then}
    <header />
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Tagline</th>
            </tr>
        </thead>
        <tbody>
            {#each rows as row}
                <tr>
                    <td>
                        <aside class="flex">
                            <img src={row.image_url} alt="beer" />
                            <b>{row.name}</b>
                        </aside>
                    </td>
                    <td>{row.description}</td>
                    <td>{row.tagline}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/await}

<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    img {
        height: 80px;
        min-width: 80px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid var(--secondary);
        margin-right: 24px;
    }
</style>

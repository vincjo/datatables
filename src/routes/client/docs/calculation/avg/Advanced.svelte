<script lang="ts">
    import { TableHandler } from '$lib/client'
    import { data } from '../data_parcel'

    const table = new TableHandler(data)
    const search = table.createSearch(['address'])

    const calc = table.createCalculation(({ width, length }) => {
        return width * length * 1.196
    })

    const avg = $derived(calc.avg({ precision: 3 }))
</script>

<section class="flex bg-darken">

    <article>
        <input type="text" bind:value={search.value} oninput={() => search.set()} placeholder="Search addresses..."/>
        <ul class="thin-scrollbar">
            {#each table.rows as row}
                <li class="flex">
                    <span>{row.address}</span>
                    <code>
                        &harr; {new Intl.NumberFormat('en-US').format(row.width)}m<br>
                        &varr; {new Intl.NumberFormat('en-US').format(row['length'])}m
                    </code>
                </li>
            {/each}
        </ul>
    </article>
    <aside class="z-depth-2">
        <p>Average area</p>
        <code>{new Intl.NumberFormat('en-US').format(avg)} yd²</code>
    </aside>
</section>

<style>
    section {
        border-radius: 8px;
        padding: 16px;
        max-width: 800px;
        flex-wrap: wrap;
        align-items: flex-start;
        border: 1px solid var(--grey);
    }
    input {
        background: var(--bg);
        border: 1px solid var(--grey);
        color: var(--font);
        height: 32px;
        width: 280px;
        padding: 0 8px;
    }
    aside {
        width: 280px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 24px 24px;
        margin-bottom: 24px;
        background: var(--grey-lighten-2);
    }
    aside p {
        margin: 0;
        font-size: 13px;
        color: var(--primary);
        text-transform: uppercase;
    }
    aside code {
        color: var(--secondary);
        font-size: 24px;
    }
    ul {
        position: relative;
        border: 1px solid var(--grey);
        overflow-y: auto;
        height: 200px;
        width: 280px;
        margin: 8px 24px 24px 0;
        padding: 8px;
        border-radius: 8px;
        background: var(--bg);
    }
    li {
        margin: 4px 0;
        border-bottom: 1px solid var(--grey-lighten);
    }
    li code {
        font-family: JetBrains;
        white-space: nowrap;
    }
    li span {
        width: 176px;
        font-size: 11px;
    }
</style>
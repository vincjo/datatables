<script lang="ts">
    import { TableHandler } from '$lib/src/client'
    import { data } from '../data_cars'

    const table = new TableHandler(data)
    const search = table.createSearch(['make', 'model'])

    const avg = $derived(table.createCalculation('price').avg())
</script>

<section class="flex bg-darken">

    <article>
        <input type="text" bind:value={search.value} oninput={() => search.set()} placeholder="Search cars..."/>
        <ul class="thin-scrollbar">
            {#each table.rows as row}
                <li class="flex">
                    <span>{row.make} - {row.model} ({row.model_year ?? 'N/A'})</span>
                    <code>🪙 {new Intl.NumberFormat('en-US').format(row.price)}</code>
                </li>
            {/each}
        </ul>
    </article>
    <aside class="z-depth-2">
        <p>Average price</p>
        <code>🪙 {new Intl.NumberFormat('en-US').format(avg)}</code>
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
        width: 240px;
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
        font-family: JetBrains;
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
        width: 184px;
        font-size: 11px;
    }
</style>
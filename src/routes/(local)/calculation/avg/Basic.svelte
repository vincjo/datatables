<script lang="ts">
    import { DataHandler } from '$lib/local'
    import { data } from '../data_cars'

    let value = ''

    const handler = new DataHandler(data)
    const rows = handler.getRows()

    const avg = handler.createCalculation('price').avg()
</script>

<section class="flex">

    <article>
        <input type="text" bind:value  on:input={() => handler.search(value, ['make', 'model'])} placeholder="Search cars..."/>
        <ul class="thin-scrollbar">
            {#each $rows as row}
                <li class="flex">
                    <span>{row.make} - {row.model} ({row.model_year ?? 'N/A'})</span>
                    <code>🪙 {new Intl.NumberFormat('en-US').format(row.price)}</code>
                </li>
            {/each}
        </ul>
    </article>
    <aside class="z-depth-2">
        <p>Average price</p>
        <code>🪙 {new Intl.NumberFormat('en-US').format($avg)}</code>
    </aside>
</section>  

<style>
    section {
        border-radius: 8px;
        padding: 16px;
        max-width: 800px;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    input {
        background: #fff;
        height: 32px;
        width: 280px;
        padding: 0 8px;
    }
    aside {
        width: 240px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 24px 24px;
        margin-bottom: 24px;
        background: #fafafa;
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
        border: 1px solid #d1d1d1;
        overflow-y: auto;
        height: 200px;
        width: 280px;
        margin: 8px 24px 24px 0;
        padding: 8px;
        border-radius: 8px;
        background: #fff;
    }
    li {
        margin: 4px 0;
        border-bottom: 1px solid #eee;
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
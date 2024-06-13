<script>
    import { TableHandler, check } from '$lib/src/client'
    import { Range } from 'gros/form'
    import { data } from './data'

    let { comparator } = $props()

    const table = new TableHandler(data[comparator.type ?? 'string'])

    let checked = $state(false)
    
    const filter = table.createFilter('value', check[comparator.name])

    let range = $state([0, 100])

    const handleRange = () => {
        filter.value = range
        filter.set()
    }

</script>

<aside>
    <h3>{comparator.name} <span>{comparator.bounds ? `[${range[0]}, ${range[1]}]` : ''}</span></h3>
    {#if comparator.type === 'number' && !comparator.bounds}
        <input type="number" bind:value={filter.value} oninput={() => filter.set()}>
    {:else if comparator.bounds}
        <div class="range flex">
            <input type="number" bind:value={range[0]} oninput={handleRange}>
            <input type="number" bind:value={range[1]} oninput={handleRange}>
        </div>
    {:else if comparator.type === 'boolean'}
        <div class="range">
            <button class="btn" onclick={() => {
                checked = !checked
                checked ? filter.value = 'x' : filter.value = ''
                filter.set()
            }}>
                <i class="micon">{checked ? 'check_box' : 'check_box_outline_blank'}</i>
                {comparator.name}
            </button>
        </div>
    {:else}
        <input type="text" spellcheck="false" bind:value={filter.value} oninput={() => filter.set()}>
    {/if}
    <ul class="thin-scrollbar">
        {#each table.rows as row}
            <li>{@html row.value ?? '<i>' + row.value + '</i>'}</li>
        {/each}
    </ul>
</aside>

<style>
    aside {
        height: 440px;
        min-width: 240px;
        margin: 16px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        width: 280px;
        padding: 16px;
        background: var(--grey-lighten-3);
    }
    h3 {
        margin: 0;
        color: var(--primary);
        font-family: JetBrains;
        font-size: 14px;
        font-weight: bold;
    }
    h3 span {
        font-family: monospace;
        color: var(--font-grey);
        font-weight: normal;
    }
    ul {
        height: calc(100% - 80px);
        color: var(--font-grey);
        position: relative;
        overflow-y: auto;
        font-family: monospace;
    }
    ul :global(i) {
        color: #bdbdbd;
        font-family: monospace;
        font-style: normal;
    }
    div.range {
        padding: 16px 8px 8px 8px;
    }
    input {
        background: var(--bg);
        color: var(--font);
        border: 1px solid var(--grey);
    }
    button {
        color: var(--font);
        text-transform: none;
        padding: 0;
        text-align: left;
        font-family: JetBrains;
    }
    button i {
        margin-right: 8px;
        color: var(--secondary);
    }
    div.range input {
        margin:0 4px;
        height: 28px;
    }
</style>
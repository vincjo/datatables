<script>
    import { TableHandler, check } from '$lib/client'
    import { Range, Checkbox } from 'gros/form'
    import { data } from './data'

    let { comparator, value = '', checked = false } = $props()

    const table = new TableHandler(data[comparator.type ?? 'string'])
    const filter = table.createFilter('value')

    $effect(() => { comparator; clear() })
    $effect(() => {
        displayedValue = comparator.bounds ? `[${value[0]}, ${value[1]}]` : ''
    })
    $effect(() => {
        value
        filter.set(value, 'value', check[comparator.name])
    })
    const clear = () => {
        table.clearFilters()
        table.setRows(data[comparator.type ?? 'string'])
        if (comparator.bounds) {
            value = comparator.bounds
        } else {
            value = ''
            checked = false
        }
    }
</script>

<aside>
    <h3>{comparator.name} <span>{displayedValue}</span></h3>
    {#if comparator.type === 'number' && !comparator.bounds}
        <input type="number" bind:value />
    {:else if comparator.bounds}
        <div class="range">
            <Range bind:value min={0} max={100} step={1} />
        </div>
    {:else if comparator.type === 'boolean'}
        <div class="range">
            <Checkbox
                bind:checked
                size={20}
                margin={[0, 8, 0, 0]}
                onclick={() => (checked ? (value = 'x') : (value = ''))}
            >
                {comparator.name}
            </Checkbox>
        </div>
    {:else}
        <input type="text" spellcheck="false" bind:value />
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
        padding: 24px 8px 16px 8px;
    }
    input {
        background: var(--bg);
        color: var(--font);
        border: 1px solid var(--grey);
    }
</style>
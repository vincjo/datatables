<script lang="ts">
    import { poemize, glyph } from './utils'
    import type { DataHandler } from '$lib'
    import { Dropdown } from 'gros/dropdown'
    import { Checkbox } from 'gros/form'
    export let handler: DataHandler
    export let key = 'status'

    const distinct = handler.createCalculation(key).distinct()
    const search = handler.createSearch(distinct)
    const items = search.get()
    const filter = handler.createAdvancedFilter(key)
    const filtered = filter.get()

    let value = ''

    handler.on('clearFilters', () => {
        value = ''
        filter.clear()
    })
</script>

<Dropdown position="bottom-start" preventClosing>
    <button class="trigger flex">
        {poemize(key)}
        {#if $filtered.length > 0 && $filtered.length < 3}
            <aside class="flex">
                {#each $filtered as item}
                    <span>{poemize(item)}</span>
                {/each}
            </aside>
        {:else if $filtered.length >= 3}
            <aside class="flex">
                <span>{$filtered.length} selected</span>
            </aside>
        {/if}
    </button>
    <article slot="content" class="z-depth-1">
        <div class="flex search">
            {@html glyph.search}
            <input type="text" bind:value on:input={() => search.set(value)} placeholder="{poemize(key)}">
        </div>
        {#each $items as item}
            {@const { value, count } = item}
            <button 
                class="btn select close-dropdown" 
                on:click={() => filter.set(value)}
                class:active={$filtered.includes(value)}
            >
                <div class="flex">
                    <Checkbox checked={$filtered.includes(value)} margin={[0,8,0,0]} size={16}/>
                    {@html glyph[value]} <span>{poemize(value)}</span>
                </div>
               {count}
            </button>
        {/each}
        {#if $filtered.length > 0}
            <div class="divider"></div>
            <button class="clear close-dropdown" on:click={() => filter.clear()}>
                Clear filters
            </button>
        {/if}
    </article>
</Dropdown>

<style>
    button.trigger {
        border: 1px dashed var(--grey);
        height: 32px;
        padding: 0 12px;
        margin-left: 8px;
        border-radius: 8px;
        color: var(--font);
    }
    article {
        margin-top: 4px;
        background: var(--bg);
        padding: 4px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        width: 192px;
        color: var(--font);
    }
    article span {
        margin-left: 4px;
    }
    aside {
        height: 20px;
        margin-left: 8px;
        border-left: 1px solid var(--grey);
        padding-left: 4px; 
    }
    aside span {
        background: var(--grey-lighten);
        padding: 2px 4px;
        margin-left: 2px;
        border-radius: 4px;
        height: 20px;
        font-size: 11px;
        line-height: 20px;
    }
    button:not(.trigger) {
        height: 28px;
        text-transform: none;
        padding: 0 16px;
        border-radius: 4px;
        width: 100%;
        justify-content: space-between;
        text-align: left;
        letter-spacing: 0;
    }
    button:not(.trigger):hover {
        background: var(--grey-lighten);
    }
    div.search {
        padding: 4px 8px;
        margin: 2px 8px;
        border-bottom: 1px solid var(--grey);
    }
    div.search input {
        border: none;
        height: 24px;
        padding: 0 12px;
        color: var(--font);
    }
    div.divider {
        height: 4px;
        border-bottom: 1px solid var(--grey);
        margin-bottom: 4px;
    }
    button.clear {
        justify-content: center;
        text-align: center;
    }
</style>
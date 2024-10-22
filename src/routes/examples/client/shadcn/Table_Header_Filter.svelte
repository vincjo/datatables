<script lang="ts">
    import { capitalize, glyph } from './utils'
    import type { TableHandler } from '$lib'
    import { Dropdown } from 'gros/dropdown'
    import { Checkbox } from 'gros/form'

    type Props = { table: TableHandler, key: string }
    let { table, key }: Props = $props()

    const distinct = table.createCalculation(key).distinct({ sort: ['count', 'desc'] })
    const search = table.createRecordFilter(distinct)
    const filter = table.createAdvancedFilter(key)
</script>

<Dropdown position="bottom-start" fixedWidth>
    <div class="trigger flex">
        <svg width="14px" height="14px" viewBox="0 0 15 15" fill="none"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        {capitalize(key)}
        {#if filter.criteria.length > 0 && filter.criteria.length < 3}
            <aside class="flex">
                {#each filter.criteria as item}
                    <span>{capitalize(item)}</span>
                {/each}
            </aside>
        {:else if filter.criteria.length >= 3}
            <aside class="flex">
                <span>{filter.criteria.length} selected</span>
            </aside>
        {/if}
    </div>
    {#snippet content()}
    <article class="z-depth-2 open-dropdown">
        <div class="flex search">
            {@html glyph.search}
            <input type="text" bind:value={search.value} oninput={() => search.set()} placeholder="{capitalize(key)}">
        </div>
        {#each search.records as item}
            {@const { value, count } = item}
            <button 
                class="btn select close-dropdown" 
                onclick={() => filter.set(value)}
                class:active={filter.criteria.includes(value)}
            >
                <div class="flex">
                    <Checkbox checked={filter.criteria.includes(value)} margin={[0,8,0,0]} size={16}/>
                    {@html glyph[value]} <span>{capitalize(value)}</span>
                </div>
               {count}
            </button>
        {/each}
        {#if filter.criteria.length > 0}
            <div class="divider leave"></div>
            <button class="clear close-dropdown" onclick={() => filter.clear()}>
                Clear filters
            </button>
        {/if}
    </article>
    {/snippet}
</Dropdown>

<style>
    div.trigger {
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
        color: var(--font);
    }
    aside {
        height: 20px;
        margin-left: 8px;
        border-left: 1px solid var(--grey);
        padding-left: 4px; 
        color: var(--font);
    }
    aside span {
        background: var(--grey-lighten);
        padding: 2px 4px;
        margin-left: 2px;
        border-radius: 4px;
        height: 20px;
        font-size: 11px;
        line-height: 20px;
        color: var(--font);
    }
    button {
        height: 28px;
        text-transform: none;
        padding: 0 16px;
        border-radius: 4px;
        width: 100%;
        justify-content: space-between;
        text-align: left;
        letter-spacing: 0;
        color: var(--font);
    }
    button:hover {
        background: var(--grey-lighten);
    }
    button :global(svg) {
        color: var(--font-grey);
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
    svg {
        margin-right: 8px;
    }
</style>
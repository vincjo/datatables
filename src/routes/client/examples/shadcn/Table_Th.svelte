<script lang="ts">
    import type { TableHandler } from '$lib/client'
    import type { Snippet } from 'svelte'
    import { Dropdown } from 'gros/dropdown'
    import { glyph } from './utils'

    type Props = { table: TableHandler, field: string, children: Snippet }
    let { table, field, children }: Props = $props()

    const view = table.getView()

    const sorting = table.createSorting(field)
</script>

<th
    class:sortable={field}
    class:active={sorting.isActive}
>
    <Dropdown position="bottom-start">
        <div
            class="flex trigger"
            style:justify-content="left"
        >
            <strong>{@render children()}</strong>
            {#if !sorting.isActive}
                <em>{@html glyph.dropdown}</em>
            {:else}
                <span>{@html glyph[table.sorting.direction]}</span>
            {/if}
        </div>
        {#snippet content()}
        <aside class="z-depth-1">
            <button class="btn" onclick={() => sorting.asc()}>{@html glyph.asc} Asc</button>
            <button class="btn" onclick={() => sorting.desc()}>{@html glyph.desc} Desc</button>
            <div class="divider"></div>
            <button class="btn" onclick={() => view.toggle(field)}>{@html glyph.hide} Hide</button>
        </aside>
        {/snippet}
    </Dropdown>

</th>


<style>
    th {
        background:inherit;
        margin:0;
        white-space:nowrap;
        padding:2px 0;
        font-size:13px;
        user-select: none;
        border-bottom:1px solid var(--grey);
        text-align: left;
    }
    th strong {
        white-space: pre-wrap;
        font-size: 13px;
        color: var(--font);
    }
    th.sortable span, em {
        margin-left:4px;
        margin-right: 16px;
        height: 12px;
        width: 12px;
        color: var(--font-grey);
    }
    em {
        color: var(--font-grey-lighten);
        height: 14px;
        width: 14px;
    }
    th:not(.sortable) span{
        visibility:hidden;
    }
    div.trigger {
        padding: 8px 0 8px 8px ;
        justify-content: space-between;
        border-radius: 4px;
    }
    div.trigger:hover{
        background: var(--grey-lighten);
    }
    aside {
        background: var(--bg);
        border-radius: 8px;
        padding: 4px;
        border: 1px solid var(--grey);
        width: 120px;
        margin-top: 4px;
    }
    aside :global(svg) {
        margin-right: 4px;
    }
    aside button {
        text-transform: none;
        letter-spacing: 0;
        justify-content: flex-start;
        padding: 6px 8px;
        width: 100%;
        border-radius: 4px;
        color: var(--font);
    }
    aside button:hover {
        background: var(--grey-lighten);
    }
    th :global(svg) {
        color: var(--font-grey);
        width: 16px;
        height: 16px;
    }
    div.divider {
        height: 2px;
        border-bottom: 1px solid var(--grey);
        margin-bottom: 2px;
    }
</style>

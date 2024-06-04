<script lang="ts">
    import type { TableHandler, Field, Row } from '$lib/client'
    import type { Snippet } from 'svelte'
    import { Dropdown } from 'gros/dropdown'
    import { glyph } from './utils'

    type Props = { table: TableHandler, field: Field<Row>, name: string, children: Snippet }
    let { table, field, name, children }: Props = $props()

    const identifier = field?.toString()
    const view = table.getView()
</script>

<th
    class:sortable={field}
    class:active={table.sorting.identifier === identifier}
>
    <Dropdown position="bottom-start">
        <button
            class="flex trigger"
            style:justify-content="left"
        >
            <strong>{@render children()}</strong>
            {#if table.sorting.identifier !== identifier}
                <em>{@html glyph.dropdown}</em>
            {:else}
                <span>{@html glyph[table.sorting.direction]}</span>
            {/if}
        </button>
        {#snippet content()}
        <aside class="z-depth-1">
            <button class="btn" onclick={() => table.sortAsc(field)}>{@html glyph.asc} Asc</button>
            <button class="btn" onclick={() => table.sortDesc(field)}>{@html glyph.desc} Desc</button>
            <div class="divider"></div>
            <button class="btn" onclick={() => view.toggle(name)}>{@html glyph.hide} Hide</button>
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
        border-bottom:1px solid #e0e0e0;
        text-align: left;
    }
    th strong {
        white-space: pre-wrap;
        font-size: 13px;
    }
    th.sortable span, em {
        margin-left:4px;
        margin-right: 16px;
        height: 12px;
        width: 12px;
        color: #616161;
    }
    em {
        color: #bdbdbd;
        height: 14px;
        width: 14px;
    }
    th:not(.sortable) span{
        visibility:hidden;
    }
    button.trigger {
        padding: 8px 0 8px 8px ;
        justify-content: space-between;
        border-radius: 4px;
    }
    button.trigger:hover{
        background: #f5f5f5;
    }
    aside {
        background: #fff;
        border-radius: 8px;
        padding: 4px;
        border: 1px solid #e0e0e0;
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
    }
    aside button:hover {
        background: #f5f5f5;
    }
    th :global(svg) {
        color: #9e9e9e;
        width: 16px;
        height: 16px;
    }
    div.divider {
        height: 2px;
        border-bottom: 1px solid #eee;
        margin-bottom: 2px;
    }
</style>

<script lang="ts">
    import type { DataHandler, Field, Row } from '$lib/client'
    import { Dropdown } from 'gros/dropdown'
    import { glyph } from './utils'

    export let handler: DataHandler
    export let orderBy: Field<Row>
    export let identifier = orderBy?.toString()
    export let numeric = false
    export let rowSpan: number = 1
    export let align: 'left' | 'right' | 'center' = numeric ? 'right' : 'left'
    export let name

    const sort = handler.getSort()
    const view = handler.getView()
</script>

<th
    class:sortable={orderBy}
    class:active={$sort.identifier === identifier}
    rowspan={rowSpan}
>
    <Dropdown position="bottom-start">
        <button
            class="flex trigger"
            style:justify-content={align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'}
        >
            <strong><slot /></strong>
            {#if $sort.identifier !== identifier}
                <em>{@html glyph.dropdown}</em>
            {:else}
                <span>{@html glyph[$sort.direction]}</span>
            {/if}
        </button>
        <aside slot="content" class="z-depth-1">
            <button class="btn" on:click={() => handler.sortAsc(orderBy)}>{@html glyph.asc} Asc</button>
            <button class="btn" on:click={() => handler.sortDesc(orderBy)}>{@html glyph.desc} Desc</button>
            <div class="divider"></div>
            <button class="btn" on:click={() => view.toggle(name)}>{@html glyph.hide} Hide</button>
        </aside>
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

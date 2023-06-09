<script lang="ts">
    import type { DataHandler, Row } from '$lib/remote'

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let orderBy: keyof T
    export let align: 'left' | 'right' | 'center' = 'left'

    const sorted = handler.getSorted()
    $: active = $sorted.find(order => order.orderBy === orderBy)
    const sort = () => {
        handler.sort(orderBy)
        handler.run('sort')
    }
</script>

<th
    on:click={sort}
    class:sortable={orderBy}
    class:active={active?.orderBy === orderBy}
    class={$$props.class ?? ''}
>
    <div
        class="flex"
        style:justify-content={align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'}
    >
        <strong>
            <slot />
        </strong>
        <span class:asc={active?.direction === 'asc'} class:desc={active?.direction === 'desc'} />
    </div>
</th>

<style>
    th {
        background: inherit;
        padding: 8px 20px;
        white-space: nowrap;
        font-size: 13px;
        user-select: none;
        border-bottom: 1px solid #e0e0e0;
    }
    th.sortable {
        cursor: pointer;
    }
    th strong {
        white-space: pre-wrap;
        font-size: 13.5px;
        line-height: 16px;
    }
    th.sortable div.flex {
        padding: 0;
        display: flex;
        align-items: center;
        height: 100%;
    }
    th.sortable span {
        padding-left: 8px;
    }
    th.sortable span:before,
    th.sortable span:after {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        width: 0;
    }
    th.sortable span:before {
        border-bottom-color: #e0e0e0;
        margin-top: 2px;
    }
    th.sortable span:after {
        border-top-color: #e0e0e0;
        margin-top: 2px;
    }
    th.active.sortable span.asc:before {
        border-bottom-color: #9e9e9e;
    }
    th.active.sortable span.desc:after {
        border-top-color: #9e9e9e;
    }
    th:not(.sortable) span {
        visibility: hidden;
    }
</style>

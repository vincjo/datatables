<script lang="ts">
    import type { TableHandlerInterface, Field } from '$lib/src/shared'
    import type { Snippet } from 'svelte'

    type T = $$Generic<Row>
    type Props = {
        table   : TableHandlerInterface<T>,
        field   : Field<T>,
        direction?: 'asc' | 'desc',
        children: Snippet
    }
    let { table, field, direction, children }: Props = $props()

    const sort = table.createSort(field).init(direction)
</script>

<th onclick={() => sort.set()} class:active={sort.isActive}>
    <div class="flex">
        <strong>
            {@render children()}
        </strong>
        <span
            class:asc={sort.direction === 'asc'}
            class:desc={sort.direction === 'desc'}>
        </span>
    </div>
</th>

<style>
    th {
        background: inherit;
        padding: 8px 20px;
        white-space: nowrap;
        font-size: 13px;
        user-select: none;
        border-bottom: 1px solid var(--grey, #e0e0e0);
        cursor: pointer;
    }
    th strong {
        white-space: pre-wrap;
        font-size: 13.5px;
        line-height: 16px;
        text-align: left;
    }
    div.flex {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
    }
    span {
        padding-left: 8px;
    }
    span:before,
    span:after {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        width: 0;
    }
    span:before {
        border-bottom-color: var(--grey, #e0e0e0);
        margin-top: 2px;
    }
    span:after {
        border-top-color: var(--grey, #e0e0e0);
        margin-top: 2px;
    }
    th.active span.asc:before {
        border-bottom-color: var(--font-grey, #9e9e9e);
    }
    th.active span.desc:after {
        border-top-color: var(--font-grey, #9e9e9e);
    }
</style>

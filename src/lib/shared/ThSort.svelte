<script lang="ts">
    import type { TableHandlerLike, FieldLike, Row } from '$lib/shared'
    import type { Snippet } from 'svelte'

    type T = $$Generic<Row>
    type Props = {
        table   : TableHandlerLike<T>,
        field   : FieldLike<T>,
        children: Snippet
    }
    let { table, field, children }: Props = $props()

    const sort = table.createSort(field)
</script>

<th onclick={() => sort.set()} class="sortable" class:active={sort.isActive}>
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
    }
    th.sortable {
        cursor: pointer;
    }
    th strong {
        white-space: pre-wrap;
        font-size: 13.5px;
        line-height: 16px;
        text-align: left;
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
        border-bottom-color: var(--grey, #e0e0e0);
        margin-top: 2px;
    }
    th.sortable span:after {
        border-top-color: var(--grey, #e0e0e0);
        margin-top: 2px;
    }
    th.active.sortable span.asc:before {
        border-bottom-color: var(--font-grey, #9e9e9e);
    }
    th.active.sortable span.desc:after {
        border-top-color: var(--font-grey, #9e9e9e);
    }
    th:not(.sortable) span {
        visibility: hidden;
    }
    div.flex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
</style>

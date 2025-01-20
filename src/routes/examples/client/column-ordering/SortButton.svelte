<script lang="ts">
    import type { TableHandlerInterface } from '$lib/src/shared'
    import type { Snippet } from 'svelte'

    type T = $$Generic<Row>
    type Props = {
        table   : TableHandlerInterface<T>,
        field   : string,
        children: Snippet
    }
    let { table, field, children }: Props = $props()

    const sort = table.createSort(field)
</script>

<div class="flex">
    <strong>
        {@render children()}
    </strong>
    <button onclick={() => sort.set()} class={[ 'flex', { active: sort.isActive }]} aria-label="sort">
        {#if sort.isActive === false}
            <em>
                <svg width="100%" height="100%" viewBox="0 0 15 15" fill="currentColor"><path d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </em>
        {:else}
            <span class={[
                { none: !sort.isActive },
                { asc: sort.direction === 'asc' },
                { desc: sort.direction === 'desc' }
            ]}>
                <svg width="100%" height="100%" viewBox="0 0 15 15" fill="currentColor"><path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </span>
        {/if}
    </button>
</div>


<style>
    div {
        color: inherit;
    }
    button {
        position: relative;
        height: 18px;
        width: 18px;
        align-items: center;
        justify-content: center;
        background: var(--grey-lighten);
        margin-left: 4px;
        border-radius: 4px;
    }
    strong {
        white-space: pre-wrap;
        font-size: 13.5px;
        line-height: 16px;
        text-align: left;
    }
    span, em {
        transition: transform, 0.2s;
        height: 12px;
        width: 12px;
        color: var(--font-grey, #757575);
    }
    em {
        color: var(--grey-darken, #d1d1d1);
        height: 14px;
        width: 14px;
    }
    span.asc {
        transform: rotate(-180deg);
    }
</style>

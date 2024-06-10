<script lang="ts">
    import { check, type TableHandler } from '$lib/client'
    type Props = { table: TableHandler }
    let { table }: Props = $props()

    const types = table.createCalculation(({ type }) => {
        return type.split(' / ')
    }).distinct()
    const filter = table.createAdvancedFilter('type', check.isLike)
</script>



<article class="thin-scrollbar">
    <h3 class="flex">
        <i class="micon">filter_list</i>
        by Types
        {#if filter.criteria.length > 0}
            <button class="clear btn" onclick={() => filter.clear()}>
                Clear
            </button>
        {/if}
    </h3>
    {#each types as type}
        {@const { value, count } = type}
        <button onclick={() => filter.set(value)} class="btn select" class:active={filter.criteria.includes(value)}>
            <i class="micon">
                {filter.criteria.includes(value) ? 'check_box' : 'check_box_outline_blank'}
            </i>
            <span>{value}</span>
            <code>{count}</code>
        </button>
    {/each}

</article>


<style>
    article {
        position: relative;
        overflow-y: auto;
        border-radius: 4px;
        margin: 8px;
        background: var(--grey-lighten-3);
        padding: 16px;
        height: 464px;
        border: 1px solid var(--grey);
    }
    h3 {
        font-size: 16px;
        color: var(--primary);
        font-weight: 400;
        margin: 0 0 16px 0;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--grey-lighten);
    }
    h3 button {
        color: #e57373;
        border: 1px solid #e57373;
        padding: 2px;
        font-size: 10px;
        border-radius: 4px;
        margin-left: 8px;
    }
    h3 i {
        margin-right: 4px;
        font-size: 16px;
    }
    button.select {
        justify-content: flex-start;
        width: 100%;
        font-size: 12px;
        padding: 2px 4px;
        text-transform: none;
    }
    button.select span {
        width: 88px;
        text-align: left;
        color: var(--font);
    }
    button.select i {
        font-size: 18px;
        margin-right: 8px;
        color: var(--font-grey);
    }
    button.select:hover {
        background: var(--primary-lighten-1);
    }
    button.select.active {
        background: var(--primary-lighten-2);
    }
    code {
        font-family: JetBrains;
        color: var(--primary);
        font-size: 11px;
        width: 16px;
        height: 16px;
        border-radius: 50px;
    }
</style>
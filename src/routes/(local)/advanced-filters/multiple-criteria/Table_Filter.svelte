<script lang="ts">
    import type { DataHandler } from '$lib/local'
    export let handler: DataHandler

    const types = handler.createCalculation('type').distinct((values) => {
        return values
            .map((value: string) => value.split(' / ') )
            .flat()
    })
    const filter = handler.createAdvancedFilter('type')
    const selected = filter.getSelected()
</script>



<article class="thin-scrollbar z-depth-2">
    <h3 class="flex">
        <i class="micon">filter_list</i>
        by Types
        {#if $selected.length > 0}
            <button class="clear btn" on:click={() => filter.clear()}>
                Clear
            </button>
        {/if}
    </h3>
    {#each types as type}
        {@const { value, count } = type}
        <button on:click={() => filter.set(value)} class="btn select" class:active={$selected.includes(value)}>
            <i class="micon">
                {$selected.includes(value) ? 'check' : 'check_box_outline_blank'}
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
        background: #fafafa;
        padding: 16px;
        height: 464px;
        border: 1px solid #e0e0e0;
    }
    h3 {
        font-size: 16px;
        color: var(--secondary);
        font-weight: 400;
        margin: 0 0 16px 0;
        padding-bottom: 4px;
        border-bottom: 1px solid #eee;
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
    }
    button.select i {
        font-size: 18px;
        margin-right: 8px;
        color: #9e9e9e;
    }
    button.select:hover {
        background: var(--primary-lighten-1);
    }
    button.select.active {
        background: var(--primary-lighten-2);
    }
    code {
        font-family: JetBrains;
        color: var(--secondary);
        font-size: 11px;
        width: 16px;
        height: 16px;
        border-radius: 50px;
    }
</style>
<script lang="ts">
    import { Dropdown } from 'gros/dropdown'
    import type { DataHandler } from '$lib/client'
    
    export let handler: DataHandler

    const distinct = handler.createCalculation('type').distinct((values) => {
        return values
            .map((value: string) => value.split(' / ') )
            .flat()
            .filter(Boolean)
    })
    const filter1 = handler.createAdvancedFilter('type')
    const filter2 = handler.createAdvancedFilter((row) => row.type)

    const selected1 = filter1.getSelected()
    const selected2 = filter2.getSelected()

</script>

<div class="flex">
    
    <Dropdown preventClosing>
        <button class="open btn">Type Filter 1 <em>[{$selected1.join(' or ')}]</em></button>
        <aside slot="content" class="z-depth-2 thin-scrollbar">
            {#each distinct as type}
                {@const { value, count } = type}
                <button on:click={() => filter1.set(value)} class="btn">
                    <i class="micon">
                        {$selected1.includes(value) ? 'check' : 'check_box_outline_blank'}
                    </i>
                    <span>{value}</span>
                    <code>{count}</code>
                </button>
            {/each}
        </aside>
    </Dropdown>
    
    AND
    
    <Dropdown preventClosing>
        <button class="open btn">Type Filter 2 <em>[{$selected2.join(' or ')}]</em></button>
        <aside slot="content" class="z-depth-2 thin-scrollbar">
            {#each distinct as type}
                {@const { value, count } = type}
                <button on:click={() => filter2.set(value)} class="btn">
                    <i class="micon">
                        {$selected2.includes(value) ? 'check' : 'check_box_outline_blank'}
                    </i>
                    <span>{value}</span>
                    <code>{count}</code>
                </button>
            {/each}
        </aside>
    </Dropdown>

</div>



<style>
    div {
        margin: 4px;
        background: #fafafa;
        padding: 4px 16px;
    }
    button.open {
        float: top;
        padding: 8px;
        background: #fff;
        text-align: left;
        color: #424242;
        border: 2px dotted var(--primary-darken);
        background: var(--primary-lighten-2);
        margin: 0 8px;

    }
    aside {
        position: relative;
        overflow-y: auto;
        max-height: 280px;
        border: 1px solid #e0e0e0;
        margin-top: 4px;
        border-radius: 4px;
        width: 184px;
        background: #fff;
    }
    aside button {
        justify-content: flex-start;
        width: 100%;
    }
    aside button span {
        width: 96px;
        text-align: left;
    }
    aside button i {
        font-size: 18px;
        margin-right: 8px;
    }
    button em {
        font-family: JetBrains;
        color: var(--secondary);
        font-style: normal;
        padding-left: 8px;
    }
</style>
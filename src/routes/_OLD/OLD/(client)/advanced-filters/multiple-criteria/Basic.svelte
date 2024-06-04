
<script lang="ts">
    import { DataHandler, check } from '$lib/local'
    import { data } from './data'
    let value = ''

    const handler = new DataHandler(data) 
    const rows = handler.getRows()

    const filter = handler.createAdvancedFilter('priority')
    const selected = filter.getSelected()
</script>



<section class="flex">

    <aside>
        <h2 class="flex">
            <i class="micon">filter_list</i>
            Priority
        </h2>
        <button 
            on:click={() => filter.set('high', check.isEqualTo)}
            class:active={$selected.includes('high')} class="btn" style:color="red">
            <i class="micon">
                {$selected.includes('high') ? 'check_box' : 'check_box_outline_blank'}
            </i>
            High
        </button>
        <button 
            on:click={() => filter.set('medium', check.isEqualTo)}
            class:active={$selected.includes('medium')} class="btn" style:color="orange">
            <i class="micon">
                {$selected.includes('medium') ? 'check_box' : 'check_box_outline_blank'}
            </i>
            Medium
        </button>
        <button 
            on:click={() => filter.set('low', check.isEqualTo)}
            class:active={$selected.includes('low')} class="btn" style:color="green">
            <i class="micon">
                {$selected.includes('low') ? 'check_box' : 'check_box_outline_blank'}
            </i>
            Low
        </button>
    </aside>

    <article>
        <input type="text" bind:value  on:input={() => handler.search(value, ['task'])} placeholder="Search tasks..."/>
        <ul class="thin-scrollbar">
            {#each $rows as row}
                <li class="flex">
                    <span>{row.task}</span>
                    <code style:color={row.priority === 'high' ? 'red' : row.priority === 'medium' ? 'orange' : 'green'}>
                        {row.priority}
                    </code>
                </li>
            {/each}
        </ul>
    </article>
</section>  

<style>
    section {
        border-radius: 8px;
        padding: 16px 0;
        max-width: 800px;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    input {
        background: #fff;
        height: 32px;
        width: 400px;
        padding: 0 8px;
    }
    aside {
        width: 160px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 24px;
        margin-right: 16px;
        background: #fafafa;
    }
    aside h2 {
        font-size: 18px;
        padding: 0 0 8px 0;
        margin: 0;
    }
    aside h2 i {
        margin-right: 8px;
    }
    aside button {
        margin: 0;
        width: 100%;
        font-size: 13px;
        padding: 2px 8px;
        justify-content: flex-start;
        text-transform: none;
        margin: 2px 0;
        font-weight: bold;
        font-family: JetBrains;
    }
    aside button.active {
        background: #eee;
    }
    aside button i {
        font-size: 18px;
        margin-right: 8px;
        color: #757575;
    }
    ul {
        position: relative;
        border: 1px solid #d1d1d1;
        overflow-y: auto;
        height: 200px;
        width: 400px;
        margin: 8px 24px 24px 0;
        padding: 8px;
        border-radius: 8px;
        background: #fff;
    }
    li {
        margin: 4px 0;
        padding: 8px;
        border-bottom: 1px solid #eee;
        justify-content: space-between;
    }
    li code {
        font-family: JetBrains;
        white-space: nowrap;
    }
    li span {
        width: 280px;
        font-size: 11px;
        margin-right: 24px;
    }
</style>
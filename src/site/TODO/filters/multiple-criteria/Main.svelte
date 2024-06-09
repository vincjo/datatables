
<script lang="ts">
    import { TableHandler, check } from '$lib/client'
    import { data } from './data'

    const table = new TableHandler(data) 
    const search = table.createSearch(['task'])
    const filter = table.createAdvancedFilter('priority')
</script>

{#snippet item(name, color)}
    <button 
        onclick={() => filter.set(name, check.isEqualTo)}
        class:active={filter.active.includes(name)} class="btn" style:color="{color}">
    <i class="micon">
        {filter.active.includes(name) ? 'check_box' : 'check_box_outline_blank'}
    </i>
    {name}
    </button>
{/snippet}


<section class="flex">

    <aside>
        <h2 class="flex">
            <i class="micon">filter_list</i>
            Filter
        </h2>
        {@render item('high', 'red')}
        {@render item('medium', 'orange')}
        {@render item('low', 'green')}
    </aside>

    <article>
        <input type="text" bind:value={search.value} placeholder="Search tasks..."/>
        <ul class="thin-scrollbar">
            {#each table.rows as row}
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
        background: var(--bg);
        border: 1px solid var(--grey);
        height: 32px;
        width: 400px;
        padding: 0 8px;
        color: var(--font-grey);
    }
    aside {
        width: 160px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 24px;
        margin-right: 16px;
        background: var(--grey-lighten-3);
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
        background: var(--grey-lighten);
    }
    aside button i {
        font-size: 18px;
        margin-right: 8px;
        color: var(--font-grey);
    }
    ul {
        position: relative;
        overflow-y: auto;
        height: 360px;
        width: 400px;
        margin: 8px 24px 24px 0;
        padding: 8px;
        border-radius: 4px;
        background: var(--grey-lighten-3);
        border: 1px solid var(--grey);
    }
    li {
        margin: 4px 0;
        padding: 8px;
        border-bottom: 1px solid var(--grey);
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
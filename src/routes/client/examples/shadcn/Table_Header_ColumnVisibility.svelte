<script lang="ts">
    import type { TableHandler } from '$lib/client'
    // import Dropdown from './Dropdown.svelte'
    import { Dropdown } from 'gros/dropdown'

    let { table }: { table: TableHandler } = $props()

    const view = table.createView([
        { name: 'title', index: 1 },
        { name: 'status', index: 2 },
        { name: 'priority', index: 3 },
    ])

    $effect(() => {
        if (table.element) {
            view.bind(table.element)
        }
    })
</script>


<Dropdown position="bottom-end">
    <article class="btn dd">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        View
     </article>
     {#snippet content()}
    <aside class="z-depth-2 open-dropdown">
        <strong>Toggle columns</strong>
        {#each view.columns as column}
            <button onclick={() => view.toggle(column.name)} class="btn">
                {#if column.isVisible}
                    <i class="micon">check</i>
                {:else}
                    <div class="micon"></div>
                {/if}
                <span style:text-transform="capitalize">{column.name}</span>
            </button>
        {/each}
    </aside>
    {/snippet}
</Dropdown>

<style>
    article.dd {
        border: 1px solid var(--grey);
        border-radius: 4px;
        padding: 0 12px;
        letter-spacing: 0;
        font-size: 12px;
        text-transform: none;
        font-family: inherit;
        height: 32px;
        color: var(--font);
    }
    svg {
        margin-right: 8px;
    }
    button i {
        padding: 0 4px 0 0;
        color: var(--font);
        font-size: 20px;
    }

    aside {
        border: 1px solid var(--grey);
        background: var(--bg);
        border-radius: 8px;
        padding: 4px;
        margin-top: 4px;
    }
    aside strong {
        display: block;
        padding: 8px 16px;
        border-bottom: 1px solid var(--grey-lighten);
        margin-bottom: 2px;
    }
    aside button {
        font-size: 12px;
        text-transform: none;
        letter-spacing: 0;
        width: 100%;
        padding: 6px 8px;
        justify-content: flex-start;
        color: var(--font);
    }

    aside button:hover {
        background: var(--grey-lighten);
    }
    aside button i {
        color: var(--font);
        font-size: 18px;
    }
    .micon {
        margin-right: 8px;
        height: 22px;
        width: 22px;
        padding: 2px;
    }
</style>
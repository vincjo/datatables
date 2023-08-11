<script lang="ts">
    import type { DataHandler } from '$lib/local'
    import { Dropdown } from 'gros/dropdown'
    export let element: HTMLElement
    export let handler: DataHandler

    const helper = handler.createColumnVisibility([
        { name: 'First Name', index: 0 },
        { name: 'Last Name', index: 1 },
        { name: 'Email', index: 2 },
    ])
    const columns = helper.get()

    $: if (element) helper.bind(element)
</script>


<Dropdown position="bottom-end">
    <button class="btn dd">
        <i class="micon">view_column</i>
        View
     </button>
    <aside slot="content">
        {#each $columns as column}
            <button on:click={() => helper.toggle(column.name)} class="btn">
                <i class="micon">{column.isVisible ? 'check_box' : 'check_box_outline_blank'}</i>
                {column.name}
            </button>
        {/each}
    </aside>
</Dropdown>

<style>
    button.dd {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        text-transform: none;
        font-family: inherit;
    }
    button i {
        padding: 0 4px 0 0;
        color: #424242;
        font-size: 20px;
    }

    aside {
        border: 1px solid #e0e0e0;
        background: #fff;
        border-radius: 4px;
        padding: 4px;
        margin-top: 2px;
    }

    aside button {
        font-size: 12px;
        text-transform: none;
        width: 100%;
        padding: 6px 8px;
        justify-content: flex-start;
    }

    aside button:hover {
        background: #eee;
    }
</style>
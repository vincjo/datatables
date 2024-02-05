<script lang="ts">
    import { glyph } from './utils'
    import { Dropdown } from 'gros/dropdown'
    import type { DataHandler } from '$lib'
    export let handler: DataHandler
    const rowsPerPage = handler.getRowsPerPage()
    const options = [10, 20, 30, 40, 50]
</script>

<article class="flex">
    <strong>Rows per page</strong>
    <Dropdown position="top-end">
        <button class="btn trigger">{$rowsPerPage} {@html glyph.dropdown}</button>
        <aside slot="content" class="z-depth-1">
            {#each options as option}
                <button class="btn" on:click={() => handler.setRowsPerPage(option)}>
                    {option}
                    {#if $rowsPerPage === option}
                        <i class="micon">check</i>
                    {/if}
                </button>
            {/each}
        </aside>
    </Dropdown>
</article>


<style>
    button.trigger {
        height: 32px;
        padding: 0 8px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin: 0 16px 0 8px;
        width: 72px;
    }
    button {
        justify-content: space-between;
    }
    aside {
        border: 1px solid #e0e0e0;
        background: #fff;
        margin-bottom: 4px;
        border-radius: 8px;
        padding: 4px;
        width: 96px;
    }
    button:not(.trigger) {
        border-radius: 4px;
        padding: 6px 8px;
        width: 100%;
    }
    button:not(.trigger):hover {
        background: #eee;
    }
    i.micon {
        font-size: 18px;
    }
</style>
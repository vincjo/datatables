<script lang="ts">
    import { glyph } from './utils'
    import { Dropdown } from 'gros/dropdown'
    import type { TableHandler } from '$lib'
    let { table }: { table: TableHandler } = $props()
    const options = [10, 20, 30, 40, 50]
</script>

<article class="flex">
    <strong>Rows per page</strong>
    <Dropdown position="top-end">
        <aside class="btn trigger flex">{table.rowsPerPage} {@html glyph.dropdown}</aside>
        {#snippet content()}
        <aside class="z-depth-1">
            {#each options as option}
                <button class="btn" onclick={() => table.setRowsPerPage(option)}>
                    {option}
                    {#if table.rowsPerPage === option}
                        <i class="micon">check</i>
                    {/if}
                </button>
            {/each}
        </aside>
        {/snippet}
    </Dropdown>
</article>


<style>
    .btn {
        letter-spacing: 0;
    }
    aside.trigger {
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--grey);
        justify-content: space-between;
        border-radius: 8px;
        margin: 0 16px 0 8px;
        width: 72px;
        color: var(--font);
    }
    button {
        justify-content: space-between;
        color: var(--font);
    }
    aside {
        border: 1px solid var(--grey);
        background: var(--bg);
        margin-bottom: 4px;
        border-radius: 8px;
        padding: 4px;
        width: 96px;
    }
    i.micon {
        font-size: 18px;
    }
</style>
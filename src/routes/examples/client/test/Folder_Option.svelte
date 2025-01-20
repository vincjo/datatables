<script lang="ts">
    import { Dropdown } from 'gros/dropdown'
    // import { modal } from '$lib/modal'

    let { folder, level }: { folder: any, level: number } = $props()
</script>



<button class="handle btn option">
    <i class="micon">drag_handle</i>
</button>
<Dropdown fixedWidth position="bottom-start">
    <button class="dropdown btn option">
        <i class="micon">more_vert</i>
    </button>
    {#snippet content()}
        <aside class="z-depth-2">
            {#if level === 0}
            <button class="btn" onclick={() => console.log(`modal.open(Modal_CreateFolder)`, folder)}>
                <i class="micon">create_new_folder</i>
                New folder...
            </button>
            {/if}
            <button class="btn" onclick={() => console.log(`modal.open(Modal_CreateFile)`)}>
                <i class="micon">note_add</i>
                New file...
            </button>
            <button class="btn delete" onclick={() => console.log(`modal.open(Modal_DeleteFolder)`)}>
                <i class="micon">delete_forever</i>
                Delete
            </button>
        </aside>
    {/snippet}
</Dropdown>


<style>
    aside {
        min-width:160px;
        background: var(--bg-darken);
        border: 1px solid var(--grey);
        border-radius: 4px;
    }
    aside button {
        justify-content: flex-start;
        border-bottom: 1px solid var(--grey);
        padding:0 4px;
        color:var(--font-grey);
        font-size:13px;
        width: 100%;
        text-transform: none;
        padding: 8px;
        border-radius: 0;
    }
    aside button:first-child {
        border-radius: 4px 4px 0 0;
    }
    aside button:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
    aside button:hover {
        background :var(--grey-lighten-2);
    }
    aside button i{
        color:var(--font-grey);
        font-size:18px;
        margin-right:8px;
    }
    aside button.delete{
        color:#e57373
    }
    aside button.delete i{
        color:#e57373
    }
</style>
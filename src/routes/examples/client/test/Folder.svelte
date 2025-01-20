<script lang="ts">
    import { Folder, type TreeHandler } from 'gros/tree'
    import Self from './Folder.svelte'
    import Files from './Files.svelte'
    import Folder_Option from './Folder_Option.svelte'
    import { Sortable } from 'gros/tree'

    type Props = { folder: any, tree: TreeHandler, level: number, parent: number }

    let {
        folder,
        tree,
        level = 0,
        parent = 0,
    }: Props = $props()
</script>


<Folder level={level} identifier={folder.id} {tree} parent={parent}>
    <section class="flex">
        {#if folder.icon && folder.id !== 0}
            <i class="icon">{@html folder.icon}</i>
        {/if}
        <h1 class={[ `level-${level}`, { uncategorized: folder.id === 0 }]}>
            {folder.title}
            {#if folder.files && folder.files.length > 0}
                <span>({folder.files.length})</span>
            {:else if folder.files && folder.folders && folder.files.length + folder.folders.length === 0}
                <span>(vide)</span>
            {/if}
        </h1>
    </section>

    {#snippet option()}
        <aside class="flex">
            {#if folder.id !== 0}
                <Folder_Option {folder} {level}/>
            {/if}
        </aside>
    {/snippet}
    {#snippet nested()}
        <article>
            <Sortable type="folder" scope={folder.id}>
            {#each folder.folders as subfolder (subfolder.id)}
                <Self folder={subfolder} level={level + 1} {tree} parent={folder.id}/>
            {/each}
            </Sortable>
            <Files {tree} {folder}/>
        </article>
    {/snippet}


</Folder>


<style>

    i.icon {
        display:block;
        height:18px;
        color:var(--primary);
        margin:0 0 0 8px;
    }
    h1{
        text-align:left;
        margin:0 0 0 4px;
        padding:0;
        font-size: 13px;
        font-weight:normal;
        font-family: Roboto;
        letter-spacing: 0px;
    }
    h1.level-0 {
        font-size: 14px;
    }
    h1 span{
        color:var(--font-grey);
        font-size: 12px;
        font-family: monospace;
        letter-spacing: -1px;
        font-weight:normal;
    }
    h1.uncategorized{
        color:#f44336;
    }

    aside{
        position:relative;
        padding:0;
        margin:0;
    }
</style>

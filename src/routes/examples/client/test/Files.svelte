<script lang="ts">
    import { Sortable, File, type TreeHandler } from 'gros/tree'
    let { folder, tree }: { folder: any, tree: TreeHandler } = $props()
</script>




<Sortable type="file" scope={folder.id}>
    {#each folder.files as file (file.id)}
        <File identifier={file.id} {tree} parent={folder.id} >
            <article class="flex">
                <i class="micon">widgets</i>
                {file.title} 
                <b style:color="red">{file.is_map ? 'MAP' : ''}</b> 
                <b style:color="blue">{file.is_filter ? 'FILTER' : ''}</b> 
            </article>
            <button class="handle option btn" slot="option">
                <i class="micon">drag_handle</i>
            </button>
        </File>
    {/each}
</Sortable>



<style>
    article {
        margin-left: 0;
        font-size:12px;
        padding:2px 0;
    }
    article i {
        font-size:14px;
        color: #bdbdbd;
        transition:color, 0.2s;
        margin: 0 8px 0 0;
    }
</style>
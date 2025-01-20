<script lang="ts">
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { data } from './data'
    import Folder from './Folder.svelte'
    import { TreeHandler, Sortable } from 'gros/tree'
    import { check, TableHandler } from '$lib/src/client'
    const tree = new TreeHandler()
    const url = tree.getURLParams()

    onMount(() => goto(url))

    const table = new TableHandler(data.folders)
    const search = table.createSearch()
    const query = table.createQuery('is_map').from(['folders', 'files'])

    let isActive = $state(false)


    const q2 = table.createQuery('is_filter').from(['folders', 'files']).where(check.isEqualTo)
    const test = () => {
        if (!isActive) {
            q2.set(true)
            isActive = true
            return
        }
        q2.clear()
        isActive = false
    }
</script>

<input type="text" bind:value={query.value} oninput={() => query.set()}>

<button onclick={() => test()}>LoooooooooooooL</button>

<button class="btn" onclick={() => tree.combine()}>
    <i class="micon">vertical_align_center</i>
    COMBINE ALL
</button>

<section class="thin-scrollbar">
    <Sortable type="folder" scope={0}>
        {#each table.rows as folder (folder.id)}
            <Folder {tree} {folder} level={0} parent={folder.parent_id}/>
        {/each}
    </Sortable>
</section>


<style>
    button {
        margin-top: 80px;
        color: var(--primary);

    }
    section {
        position: relative;
        overflow-y: auto;
        height: fit-content;
        margin-bottom: 80px;
        width: 600px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding: 24px;
    }
</style>
<script lang="ts">
    import type { DataHandler } from '$lib/client'
    export let handler: DataHandler
    export let filterBy: string
    let filter_0 = false
    let filter_1 = false

    const setFilter = () => {
        if (filter_0 && filter_1 === false) {
            return handler.filter(0, filterBy)
        }
        else if (filter_0 === false && filter_1) {
            return handler.filter(1, filterBy)
        }
        return handler.filter(null, filterBy)
    }
</script>

<aside class="flex">
    <button on:click={() => { filter_0 = !filter_0; setFilter(); }}>
        <input type="checkbox" checked={filter_0} />
        [0]
    </button>

    <button on:click={() => { filter_1 = !filter_1; setFilter(); }}>
        <input type="checkbox" checked={filter_1} />
        [1]
    </button>
</aside>


<style>
    aside {
        justify-content: space-between;
    }
</style>
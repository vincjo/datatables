<script lang="ts">
    import type { TableHandler } from '$lib/src/client'

    let { table }: { table: TableHandler } = $props()
    const search = table.createSearch()
</script>


<aside>
    <input type="text" placeholder="Search recursively" bind:value={search.value} spellcheck="false" oninput={() => search.recursive()}>
</aside>

<style>
    aside {
        margin-bottom: 16px;
    }
    input {
        color: var(--font);
        border-radius: 8px;
    }
</style>

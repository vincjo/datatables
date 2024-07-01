<script lang="ts">
    import type { TableHandler } from '$lib/src/client'

    let { table }: { table: TableHandler } = $props()
    const search = table.createSearch()
</script>


<aside>
    <div class="btn">SEARCH</div>
    <input type="text" bind:value={search.value} spellcheck="false" oninput={() => search.set()}>
</aside>

<style>
    aside {
        margin-bottom: 16px;
    }
    input {
        color: var(--font);
        border-radius: 0 8px 8px 8px;
    }
    div {
        color: var(--font);
        background: var(--grey);
        border-radius: 8px 8px 0 0;
        width: 80px;
        height: 32px;
    }
</style>

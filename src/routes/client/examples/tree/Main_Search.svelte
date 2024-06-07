<script>
    let { table } = $props()
</script>


<aside>
    <input type="text" bind:value={table.search}>
</aside>

<style>
    aside {
        margin-bottom: 16px;
    }
    input {
        color: var(--font);
    }
</style>
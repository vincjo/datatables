<script>
    let { types } = $props()
    const [ typ1, typ2 ] = $derived(types)
</script>

<b>{typ1.type.name}</b>
{#if typ2}
    / <b>{typ2.type.name}</b>
{/if}

<style>
    b {
        color: #757575;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: 200;
    }
</style>
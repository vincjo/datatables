<script>
    import Component from './Component.svelte'
    const content = 'test'
</script>

<Component content={content}>
    {#snippet header()}
        <p>header</p>
    {/snippet}

    <p>article</p>

    {#snippet footer()}
        <p>footer</p>
    {/snippet}
</Component>




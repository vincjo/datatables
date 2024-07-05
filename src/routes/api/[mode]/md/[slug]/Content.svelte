<script lang="ts">
    let { data }: { data: any, key: string } = $props()
</script>


<section>
    <h1>{data.name}</h1>


    {#key data}
        {@html data.markdown}
    {/key}
</section>


<style>
    h1 {
        font-size: 24px;
        font-family: JetBrains;
        color: var(--primary);
        margin: 0 8px 0 0;
    }
</style>
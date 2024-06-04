<script lang="ts">
    import Highlight from '$site/components/Highlight.svelte'
    import Ext       from './Content_Ext.svelte'

    let { data }: { data: any, key: string } = $props()
    const isDeprecated = false
</script>


<section>
    <h1 class:deprecated={isDeprecated}>
        {data.name}
    </h1>
    {#if isDeprecated}
        <span>@deprecated</span>
    {/if}

    {#key data}
        <Highlight code={data.text} fontSize="16px" padding="8px"/>
        {#if data.ext} 
            <Ext methods={data.ext.methods} properties={data.ext.properties}/>
        {/if}

        <br><br>

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
    h1.deprecated {
        color: var(--font-grey);
        text-decoration: solid line-through var(--font-grey);
        /* text-decoration: solid line-through #e57373; */
    }
    span {
        color: var(--ternary);
        font-size: 18px;
        font-family: JetBrains;
    }
</style>
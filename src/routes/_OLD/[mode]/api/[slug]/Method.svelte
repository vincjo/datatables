<script lang="ts">
    import Highlight from '$site/components/Highlight.svelte'
    import { TSParser } from '$site/utils'
    export let parser
    export let name: string
    export let md = undefined
    export let helper = undefined
</script>


<section>
    <h1 class:deprecated={parser.isDeprecated}>
        {name}
    </h1>
    {#if parser.isDeprecated}
        <span>@deprecated</span>
    {/if}
    <Highlight code={parser.declaration} fontSize="18px"/>

    {#if helper} 
        <h2>Methods</h2>
        {#each helper as method}
        <Highlight code={TSParser.getDeclaration(method)} fontSize="16px" padding="8px"/>
        {/each}
    {/if}

    <br><br>

    {#if md}
        {@html md}
    {/if}
</section>


<style>
    h1 {
        font-size: 24px;
        font-family: JetBrains;
        color: var(--primary);
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
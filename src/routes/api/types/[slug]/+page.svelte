<script lang="ts">
    import { page } from '$app/stores'
    import Highlight from '$site/components/Highlight.svelte'
    export let data
    let name = $page.params.slug
    let def

    const find = () => {
        name = $page.params.slug
        def = data.parser.types.find(item => item.name === name)
    }
    $: $page, find()
</script>



<h1 class:deprecated={def?.isDeprecated}>
    {name}
</h1>
{#if def}
    {#if def.isDeprecated}
        <span>@deprecated</span>
    {/if}
    <Highlight code={def.declaration} fontSize="16px"/>

    <p>{@html def.abstract}</p>

    {#if def.example}
        <h2 class="alt-font">Example</h2>
        <Highlight code={def.example} fontSize="16px"/>
    {/if}
{:else}
    <h2 class="nodoc">Not yet documented</h2>
{/if}

<style>
    h1 {
        font-size: 24px;
        font-family: JetBrains;
        color: var(--primary-darken);
    }
    h1.deprecated {
        text-decoration: solid line-through #e57373;
    }
    p {
        margin: 40px 0;
        font-size: 18px;
        font-family: JetBrains;
        color: #424242;
    }
    h2 {
        font-size: 24px;
        font-family: JetBrains;
        color: var(--primary);
    }
    .nodoc {
        color: var(--ternary);
    }
    span {
        color: var(--secondary);
        font-size: 18px;
        font-family: JetBrains;
    }
</style>
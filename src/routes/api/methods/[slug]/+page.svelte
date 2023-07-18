<script lang="ts">
    import Highlight from '$site/components/Highlight.svelte'
    import { page } from '$app/stores'
    export let data
    let name
    let def
    let declaration

    const find = () => {
        name = $page.params.slug
        def = data.parser.methods.find(item => item.name === name)
        const params = def?.params.map(param => {
            return param.name + ': ' + param.type
        }).join(', ')
        const type = def?.type ? def.type : 'void'
        declaration = `${name}(${params}): ${type}`
    }
    $: $page, find()
</script>


<section>
    <h1 class:deprecated={def?.isDeprecated}>
        {name}
    </h1>
    <Highlight code={declaration} fontSize="18px"/>

    <br><br>

    {#if def.md}
        {#if def.isDeprecated}
            <span>@deprecated</span>
        {/if}
        {@html def.md}
    {/if}
</section>


<style>
    h1 {
        font-size: 24px;
        font-family: JetBrains;
        color: var(--secondary-darken);
    }
    h1.deprecated {
        text-decoration: solid line-through #e57373;
    }
    section :global(p) {
        margin: 0;
        font-size: 18px;
        font-family: JetBrains;
        color: #424242;
    }
    section :global(h2) {
        font-size: 18px;
        font-family: JetBrains;
        margin-top: 40px;
        color: var(--secondary);
    }
    span {
        color: var(--secondary);
        font-size: 18px;
        font-family: JetBrains;
    }
</style>
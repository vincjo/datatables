<script lang="ts">
    import { page } from '$app/stores'
    import Method from './Method.svelte'
    import Type from './Type.svelte'
    export let data
    let [category, name] = $page.params.slug.split('~')
    let parser: any = {}


    const find = () => {
        [category, name] = $page.params.slug.split('~')
        if (category === 'methods') {

            const method = data.parser.methods.find(item => item.name === name)
            parser = method
        }
        else {
            parser = data.parser.types.find(item => item.name === name)
        }
    }
    $: $page, find()
</script>

<section class="api">
    {#if category === 'methods'}
        <Method {parser} {name} md={data.doc?.md} helper={data?.helper}/>
    {:else}
        <Type {parser} {name} md={data.doc?.md}/>
    {/if}
</section>


<style>
    section :global(p) {
        font-size: 18px;
        font-family: JetBrains;
        color: var(--font-grey);
    }
    section :global(h2) {
        font-size: 18px;
        font-family: JetBrains;
        margin-top: 40px;
        color: var(--primary);
    }
    section :global(p code) {
        background: var(--primary-lighten-1);
        padding: 2px 4px;
        color: var(--primary);
        border: 1px solid var(--primary-lighten-1);
        border-radius: 4px;
    }
</style>
<script>
    import Properties from './Properties.svelte'
    import Methods from './Methods.svelte'
    import Highlight from '$site/components/Highlight.svelte'
    let { data } = $props()
    // const { properties, methods } = ast.declarations


</script>


<pre>{JSON.stringify(data.ast, null, 4)}</pre>
<!-- <Methods ast={methods}/> -->
<!-- <Properties ast={properties}/> -->
<!-- {#each ast.declarations as type}
<h1>{type.name}</h1>
<Highlight code={'type ' + type.name + ' = ' + type.value.text}/>
{/each} -->
<style>
    pre {
        color: var(--font);
    }
</style>
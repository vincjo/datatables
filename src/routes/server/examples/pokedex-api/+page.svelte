<script>
    // import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    let { data } = $props()
</script>

<h1>Pokedex API <a href="https://pokeapi.co/docs/v2#pokemon-section" rel="external"> DOC &rarr;</a></h1>
<Features rowsPerPage={true} totalRows={true} pagination/>
<!-- <Demo components={data.components} dataset={JSON.stringify(data.dataset, null, 2)} scrollY={false}>
    <Main data={data.dataset}/>
</Demo> -->

<section class="bg-darken">
    <Main data={data.dataset}/>
</section>

<style>
    section {
        max-width: 800px;
        border-radius: 8px;
        border: 1px solid var(--grey);
        padding: 8px;
        height: 480px;
    }
    a {
        font-family: JetBrains;
        color: var(--primary-lighten);
        text-decoration: none;
        font-size: 13px;
    }
</style>
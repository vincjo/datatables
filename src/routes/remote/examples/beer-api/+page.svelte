<script>
    // import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    let { data } = $props()
</script>

<h1>Beer API <a href="https://punkapi.com/documentation/v2" rel="external"> DOC &rarr;</a></h1>
<Features rowsPerPage={true} search={true}/>
<!-- <Demo components={data.components} dataset={JSON.stringify(data.dataset, null, 2)} scrollY={false}>
    <Main data={data.dataset}/>
</Demo> -->

<section>
    <Main data={data.dataset}/>
</section>


<style>
    section {
        max-width: 720px;
        border-radius: 8px;
        border: 1px solid var(--grey);
        padding: 8px;
    }
    a {
        font-family: JetBrains;
        color: var(--primary-lighten);
        text-decoration: none;
        font-size: 13px;
    }
</style>
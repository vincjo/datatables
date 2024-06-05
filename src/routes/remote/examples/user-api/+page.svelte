<script>
    // import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    export let data
</script>

<h1>User API <a href="https://dummyjson.com/docs/users" rel="external"> DOC &rarr;</a></h1>
<Features rowsPerPage={true} totalRows={true} search={true}/>
<!-- <Demo components={data.components} dataset={JSON.stringify(data.dataset, null, 2)} scrollY={true}>
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
    }
    a {
        font-family: JetBrains;
        color: var(--primary-lighten);
        text-decoration: none;
        font-size: 13px;
    }
</style>
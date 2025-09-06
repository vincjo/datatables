<script>
    // import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    let { data } = $props()
</script>

<h1>
    Todo API
    <a href="https://github.com/vincjo/datatables/tree/main/src/routes/examples/server/todo-api" rel="external">SOURCE CODE</a> 
    <a href="https://jsonplaceholder.typicode.com/" rel="external"> | API DOC</a> 
</h1>
<Features search={true} rowsPerPage={true} filters={true} sort={true}/>
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
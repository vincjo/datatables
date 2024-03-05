<script>
    import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    export let data
</script>

<h1>
    Comment API
    <a href="https://jsonplaceholder.typicode.com/" rel="external"> DOC</a> 
    <a href="https://github.com/typicode/json-server" rel="external"> | SOURCE &rarr;</a>
</h1>
<Features sort={true} rowsPerPage={true} totalRows={true}/>
<Demo components={data.components} dataset={JSON.stringify(data.dataset, null, 2)} scrollY={true}>
    <Main data={data.dataset}/>
</Demo>

<style>
    a {
        font-family: JetBrains;
        color: var(--primary-lighten);
        text-decoration: none;
        font-size: 13px;
    }
</style>
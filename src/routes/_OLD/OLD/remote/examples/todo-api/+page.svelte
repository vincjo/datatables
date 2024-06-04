<script>
    import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    export let data
</script>

<h1>Column filtering</h1>
<h2>
    Todos API
    <a href="https://jsonplaceholder.typicode.com/" rel="external"> DOC</a> 
    <a href="https://github.com/typicode/json-server" rel="external"> | SOURCE &rarr;</a>
</h2>
<Features search={true} rowsPerPage={true} filters={true} sort={true}/>
<Demo components={data.components} dataset={JSON.stringify(data.dataset, null, 2)} scrollY={true}>
    <Main data={data.dataset}/>
</Demo>

<style>
    h1 {
        color: var(--primary);
        font-weight: normal;
        font-size: 16px;
    }
    h2 {
        font-size: 24px;
        color: var(--r-primary);
        font-weight: 400;
        margin: 16px 0 8px 0;
    }
    a {
        font-family: JetBrains;
        color: var(--primary-lighten);
        text-decoration: none;
        font-size: 13px;
    }
</style>
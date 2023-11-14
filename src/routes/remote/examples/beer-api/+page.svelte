<script>
    import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    import Features from '../Features.svelte'
    import Selection from './selection.svx'
    export let data
</script>

<h1>Row selection</h1>
<h2>Beers API <a href="https://punkapi.com/documentation/v2" rel="external"> DOC &rarr;</a></h2>
<Features rowsPerPage={true} search={true}/>
<Demo components={data.components} dataset={JSON.stringify(data.dataset, null, 2)} scrollY={false}>
    <Main data={data.dataset}/>
</Demo>

<article>
    <Selection/>
</article>


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
    article {
        max-width: 800px;
        margin-top: 40px;
        color: #424242;
    }
</style>
<script>
    import Tutorial from '$site/components/Tutorial.svelte'
    import Main from './Main.svelte'
    export let data
</script>

<h1>HTML Table + data</h1>

<p>To start we have a bit of data and we want to display it in an HTML table.</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
    <Main />
</Tutorial>

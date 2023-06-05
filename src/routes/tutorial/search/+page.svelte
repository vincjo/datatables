<script>
    import Tutorial from '$components/Tutorial.svelte';
    import Main from './Main.svelte';
    export let data;
</script>

<h2>Search</h2>

<p>Above the table, we will now add a search bar.</p>

<p>For this we create a <code>header</code> element in <code>Main.svelte</code></p>
<p>Then we place the <code>Search.svelte</code> component in it.</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
    <Main />
</Tutorial>

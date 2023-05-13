<script>
    import Tutorial from '$components/Tutorial.svelte';
    import Main from './Main.svelte';
    export let data;
</script>

<h2>Sort data</h2>

<p>
    When clicking on the <code>th</code> element, we want the column to be sorted, one move up, the next
    down.
</p>
<p>We create a dedicated component <code>Th.svelte</code> to keep the logic well separated.</p>
<p>
    We will need to specify which object key will be sorted by passing the <code>orderBy</code> property
    to the component.
</p>
<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
    <Main />
</Tutorial>

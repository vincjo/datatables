<script>
    import Tutorial from '$components/Tutorial.svelte';
    import Main from './Main.svelte';
    export let data;
</script>

<h2>Rows per page</h2>

<p>
    To the right of the search bar, we will add a control to set the number of rows displayed in the
    table
</p>

<p>
    We create a <code>RowsPerPage.svelte</code> component. Then we add it into the
    <code>header</code>
    element in <code>Main.svelte</code>.
</p>

<p>We will see later how to manage the pagination.</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
    <Main />
</Tutorial>

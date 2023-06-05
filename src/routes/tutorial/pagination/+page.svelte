<script>
    import Tutorial from '$components/Tutorial.svelte';
    import Main from './Main.svelte';
    export let data;
</script>

<h2>Pagination</h2>

<p>The last component for this tutorial will be to display the navigation buttons between pages.</p>

<p>
    We will use the <code>getPages({`{ ellipsis: true }`})</code> method. It returns an array of
    numbers (the page numbers) containing the dynamic ellipses represented by <code>null</code> values.
    The number of buttons is thus maximized to 9.
</p>

<p>
    We create a <code>Pagination.svelte</code> component and place it inside the <code>footer</code>
    element in <code>Main.svelte</code>.
</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
    <Main />
</Tutorial>

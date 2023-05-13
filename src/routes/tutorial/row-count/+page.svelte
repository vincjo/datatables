<script>
  import Tutorial from '$components/Tutorial.svelte';
  import Main from './Main.svelte';
  export let data;
</script>

<h2>Row count</h2>

<p>Before creating the navigation buttons, we will display the dynamic row count.</p>

<p>
  This will be displayed under the data table, left side. We create a <code>footer</code> element in
  <code>Main.svelte</code>.
</p>

<p>Then we write the logic in a separate component: <code>RowCount.svelte</code>.</p>

<p>Finally we import it into the main component.</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
  <Main />
</Tutorial>

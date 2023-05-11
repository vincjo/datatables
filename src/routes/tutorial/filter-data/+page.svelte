<script>
  import Tutorial from '$components/Tutorial.svelte';
  import Main from './Main.svelte';
  export let data;
</script>

<h2>Filter data</h2>

<p>We also want to filter the table data for each column.</p>

<p>
  We add a new row in <code>thead</code> and place a <code>ThFilter.svelte</code> component - a text
  input.
</p>
<p>
  We will need to specify which object key will be filtered by passing the <code>filterBy</code> property
  to the component.
</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
  <Main />
</Tutorial>

<script>
  import Tutorial from '$components/Tutorial.svelte';
  import Main from './Main.svelte';
  export let data;
</script>

<h2>HTML Table + data</h2>

<p>To start we have a bit of data and we want to display it in an HTML table.</p>

<Tutorial components={data.components} dataset={data.dataset} scrollY={false}>
  <Main />
</Tutorial>

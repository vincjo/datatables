<script>
  import Demo from '$components/Demo.svelte';
  import Main from './Main.svelte';
  import Code from './code.svx';
  export let data;
</script>

<h2>Optional blocks</h2>
<p>The Datatable header and footer components are optional.</p>
<Code />

<Demo components={data.components} dataset={data.dataset} scrollY={false}>
  <Main />
</Demo>

<style>
  h2 {
    font-size: 24px;
    color: var(--secondary);
    font-weight: 400;
    margin: 16px 0 8px 0;
  }
</style>

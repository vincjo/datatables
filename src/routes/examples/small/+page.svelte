<script>
  import Demo from '$components/Demo.svelte';
  import Main from './Main.svelte';
  export let data;
</script>

<h2>A small datatable with x&y scrollbars</h2>
<Demo components={data.components} dataset={data.dataset} width={'400px'}>
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

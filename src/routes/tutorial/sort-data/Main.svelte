<script>
  import { DataHandler } from '$lib/core';
  import Th from '../Th.svelte';
  import data from '$data/data';

  const handler = new DataHandler(data, { rowsPerPage: 20 });
  const rows = handler.getRows();
</script>

<table>
  <thead>
    <tr>
      <Th {handler} orderBy="first_name">First name</Th>
      <Th {handler} orderBy="last_name">Last name</Th>
      <Th {handler} orderBy="email">Email</Th>
    </tr>
  </thead>
  <tbody>
    {#each $rows as row}
      <tr>
        <td>{row.first_name}</td>
        <td>{row.last_name}</td>
        <td>{row.email}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
</style>

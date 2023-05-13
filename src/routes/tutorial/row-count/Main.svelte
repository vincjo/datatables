<script>
  import { DataHandler } from '$lib/core';
  import Th from '../Th.svelte';
  import ThFilter from '../ThFilter.svelte';
  import Search from '../Search.svelte';
  import RowsPerPage from '../RowsPerPage.svelte';
  import RowCount from '../RowCount.svelte';
  import data from '$data/data';

  const handler = new DataHandler(data, { rowsPerPage: 20 });
  const rows = handler.getRows();
</script>

<header>
  <Search {handler} />
  <RowsPerPage {handler} />
</header>

<table>
  <thead>
    <tr>
      <Th {handler} orderBy="first_name">First name</Th>
      <Th {handler} orderBy="last_name">Last name</Th>
      <Th {handler} orderBy="email">Email</Th>
    </tr>
    <tr>
      <ThFilter {handler} filterBy="first_name" />
      <ThFilter {handler} filterBy="last_name" />
      <ThFilter {handler} filterBy="email" />
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

<footer>
  <RowCount {handler} />
</footer>

<style>
  header,
  footer {
    height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer {
    border-top: 1px solid #e0e0e0;
  }
  table {
    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
</style>

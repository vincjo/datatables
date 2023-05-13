<script lang="ts">
  import myData from '$data/test';
  import { DataHandler, Datatable, Th, ThFilter } from '$lib/core';

  const handler = new DataHandler(myData, { rowsPerPage: 50 });
  const rows = handler.getRows();

  type Car = { model: string; manufacturer: string };
  type Row = { firstname: string; lastname: string; country: string; car: Car[] };
</script>

<Datatable {handler}>
  <table>
    <thead>
      <tr>
        <Th {handler} orderBy="firstname">First Name</Th>
        <Th {handler} orderBy="lastname">Last Name</Th>
        <Th {handler} orderBy="country">Country</Th>
        <Th {handler} orderBy="car">Car</Th>
      </tr>
      <tr>
        <ThFilter {handler} filterBy="firstname" />
        <ThFilter {handler} filterBy="lastname" />
        <ThFilter {handler} filterBy="country" />
        <ThFilter {handler} filterBy="car" />
      </tr>
    </thead>
    <tbody>
      {#each $rows as row}
        <tr>
          <td>{row.firstname}</td>
          <td>{row.lastname}</td>
          <td>{@html row.country ?? '<code>null</code>'}</td>
          <td class="list">
            {#if !row.car}
              <code>null</code>
            {:else}
              <ul>
                {#each row.car as car}
                  <li style:color={car.hex}>
                    {car.model} ({car.manufacturer})
                  </li>
                {/each}
              </ul>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Datatable>

<style>
  thead {
    background: #fff;
  }
  tbody td {
    border: 1px solid #f5f5f5;
    padding: 4px 20px;
  }
  tbody tr {
    transition: all, 0.2s;
  }
  tbody tr:hover {
    background: #f5f5f5;
  }
  td.list {
    text-align: left;
    white-space: nowrap;
  }
  td ul {
    margin: 0;
    padding: 0;
    list-style-type: square;
  }
  td li {
    font-weight: bold;
    font-size: 12px;
  }
  td :global(code) {
    color: #bdbdbd;
    font-size: 12px;
  }
</style>

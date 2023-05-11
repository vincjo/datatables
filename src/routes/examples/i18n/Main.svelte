<script lang="ts">
  import myData from '$data/data';
  import { DataHandler, Datatable, Th, ThFilter } from '$lib/core';

  const handler = new DataHandler(myData, {
    rowsPerPage: 10,
    i18n: {
      search: 'Rechercher...',
      show: 'Afficher',
      entries: 'lignes',
      filter: 'Filtrer',
      rowCount: 'Lignes {start} à {end} sur {total}',
      noRows: 'Aucun résultat',
      previous: 'Précédent',
      next: 'Suivant'
    }
  });
  const rows = handler.getRows();
</script>

<Datatable {handler}>
  <table>
    <thead>
      <tr>
        <Th {handler} orderBy="first_name">First Name</Th>
        <Th {handler} orderBy="last_name">Last Name</Th>
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
</style>

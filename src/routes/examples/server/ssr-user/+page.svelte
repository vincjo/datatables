<script lang="ts">
  import { navigating } from "$app/state";
  import type { PageData } from "./$types";

  import Features from "../Features.svelte";

  let { data }: { data: PageData } = $props();
  import {
    TableHandler,
    Datatable,
    ThSort,
    ThFilter,
    Pagination,
    RowsPerPage,
    Search,
    Th,
    type State,
  } from "$lib/src/server";
  import { SSRFilters } from "./params.svelte";

  const filters = new SSRFilters();

  const table = new TableHandler(data.rows, {
    rowsPerPage: 10,
    totalRows: data.count,
  });

  table.load(async (s) => {
    console.log(s);
    filters.fromState(s);
    await navigating?.complete;
    return data.rows;
  });
</script>

<h1>SSR Table with Simple Filters <a href="https://github.com/vincjo/datatables/blob/main/src/routes/examples/server/ssr-user/params.svelte.ts" target="_blank" rel="external"> Filter Module Code &rarr;</a></h1>
<Features search rowsPerPage totalRows pagination/>


<Datatable {table}>
  {#snippet header()}
    <Search {table} />
    <RowsPerPage {table} />
  {/snippet}
  <table>
    <thead>
      <tr>
        <Th>ID</Th>
        <Th>Avatar</Th>
        <Th>Fristname</Th>
        <Th>Lastname</Th>
        <Th>Age</Th>
        <Th>Gender</Th>
        <Th>Height / Weight</Th>
      </tr>
    </thead>
    <tbody>
      {#each table.rows as row (row.id)}
        <tr>
          <td>{row.id}</td>
          <td>
            <img
              src={row.image}
              alt="avatar"
            />
          </td>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.age}</td>
          <td>{row.gender}</td>
          <td>
            {String(row.height / 100).substring(0, 4)}m / {String(
              row.weight,
            ).substring(0, 4)}kg
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {#snippet footer()}
    <div></div>
    <Pagination {table} />
  {/snippet}
</Datatable>

<style>
  img {
    width: 24px;
    height: 24px;
  }

  section {
        max-width: 800px;
        border-radius: 8px;
        border: 1px solid var(--grey);
        padding: 8px;
        height: 480px;
    }
    a {
        font-family: JetBrains;
        color: var(--primary-lighten);
        text-decoration: none;
        font-size: 13px;
    }
</style>

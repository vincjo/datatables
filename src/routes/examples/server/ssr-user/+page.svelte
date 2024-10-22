
<script lang="ts">
    import { navigating } from '$app/stores';
    import type { PageData } from './$types'
  
    let { data }: { data: PageData } = $props()
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
    } from '$lib/src/server'
    import { SSRFilters } from './params.svelte';
  
    const filters = new SSRFilters()
  
    const table = new TableHandler(data.rows, {
      rowsPerPage: 10,
      totalRows: data.count,
    })
  
    table.load(async s => {
      console.log(s)
      filters.fromState(s)
      await $navigating?.complete
      return data.rows
    })
  </script>
  
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
            {#each table.rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>
                        <img src="{row.image}" alt="avatar" />
                    </td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.age}</td>
                    <td>{row.gender}</td>
                    <td>
                        {String(row.height / 100).substring(0, 4)}m / {String(row.weight).substring(0, 4)}kg
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
  </style>
  
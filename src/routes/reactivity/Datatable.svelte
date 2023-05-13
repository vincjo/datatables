<script lang="ts">
  import { DataHandler, Datatable, Th } from '$lib/core';
  import { users } from './store';
  import { modal } from 'gros/modal';
  import Update from './Modal_Update.svelte';
  import Destroy from './Modal_Destroy.svelte';
  import Create from './Modal_Create.svelte';
  const handler = new DataHandler($users, { rowsPerPage: 20 });
  const rows = handler.getRows();

  let element;

  $: $users, update();

  const update = () => {
    if (element) {
      const scrollTop = element.parentNode.scrollTop;
      handler.setRows($users);
      setTimeout(() => {
        element.parentNode.scrollTop = scrollTop;
      }, 2);
    }
  };
</script>

<div class="fieldset">
  <aside>
    <button class="btn create" on:click={() => modal.open(Create)}>
      <i class="micon">person_add</i>
      Create a user
    </button>
  </aside>
  <section>
    <Datatable {handler} rowsPerPage={false} search={false}>
      <table bind:this={element}>
        <thead>
          <tr>
            <Th {handler} />
            <Th {handler} orderBy="id">ID</Th>
            <Th {handler} orderBy="first_name">First name</Th>
            <Th {handler} orderBy="last_name">Last name</Th>
            <Th {handler} orderBy="email">Email</Th>
          </tr>
        </thead>
        <tbody>
          {#each $rows as row}
            <tr>
              <td>
                <div class="flex">
                  <button class="btn" on:click={() => modal.open(Update, row)}>
                    <i class="micon">edit</i>
                  </button>
                  <button class="btn" on:click={() => modal.open(Destroy, row)}>
                    <i class="micon">delete_forever</i>
                  </button>
                </div>
              </td>
              <td>{row.id}</td>
              <td>{row.first_name}</td>
              <td>{row.last_name}</td>
              <td>{row.email}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </Datatable>
  </section>
</div>

<style>
  div.fieldset {
    display: inline-block;
    border: 1px dashed var(--secondary);
    border-radius: 16px;
    padding: 0;
  }
  section {
    max-width: 800px;
    height: 400px;
  }
  thead {
    background: #fff;
  }
  tbody td {
    padding: 4px 20px;
    border: 1px solid #f5f5f5;
  }
  tbody tr {
    transition: all, 0.2s;
  }
  tbody tr:hover {
    background: #f5f5f5;
  }
  button {
    margin: 0 4px;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    color: var(--primary);
  }
  button.create {
    margin: 8px;
    border-radius: 8px;
  }
  button.create i {
    margin: 0 8px 0 0px;
  }
  button:hover {
    background: #eee;
  }
  table button {
    width: 32px;
    height: 32px;
    margin: 0 2px;
    border-radius: 50%;
    background: #f5f5f5;
  }
  button i {
    color: var(--primary);
    font-size: 18px;
  }
</style>

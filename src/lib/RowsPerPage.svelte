<script lang="ts">
  import type { DataHandler } from '$lib/core';
  export let handler: DataHandler;
  export let small = false;
  const rowsPerPage = handler.getRowsPerPage();

  const options = [5, 10, 20, 50, 100];
</script>

<aside class={$$props.class ?? ''}>
  {#if !small}
    <span>{handler.i18n.show}</span>
  {/if}
  <select bind:value={$rowsPerPage} on:change={() => handler.setPage(1)}>
    {#each options as option}
      <option value={option}>
        {option}
      </option>
    {/each}
  </select>
  {#if !small}
    <span>{handler.i18n.entries}</span>
  {/if}
</aside>

<style>
  aside {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 32px;
    color: #757575;
  }
  select {
    margin: 0 4px;
  }
</style>

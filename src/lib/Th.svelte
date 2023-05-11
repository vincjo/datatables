<script lang="ts">
  import type { DataHandler } from '$lib/core';
  export let handler: DataHandler;
  export let orderBy = null;
  export let align: 'left' | 'right' | 'center' = 'left';
  const identifier = orderBy ? orderBy.toString() : orderBy;

  const sorted = handler.getSorted();
</script>

<th
  on:click={() => handler.sort(orderBy)}
  class:sortable={orderBy}
  class:active={$sorted.identifier === identifier}
  class={$$props.class ?? ''}
>
  <div
    class="flex"
    style:justify-content={align === 'left'
      ? 'flex-start'
      : align === 'right'
      ? 'flex-end'
      : 'center'}
  >
    <strong>
      <slot />
    </strong>
    <span class:asc={$sorted.direction === 'asc'} class:desc={$sorted.direction === 'desc'} />
  </div>
</th>

<style>
  th {
    background: inherit;
    padding: 8px 20px;
    white-space: nowrap;
    font-size: 13px;
    user-select: none;
    border-bottom: 1px solid #e0e0e0;
  }
  th.sortable {
    cursor: pointer;
  }
  th strong {
    white-space: pre-wrap;
    font-size: 13.5px;
    line-height: 16px;
  }
  th.sortable div.flex {
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
  th.sortable span {
    padding-left: 8px;
  }
  th.sortable span:before,
  th.sortable span:after {
    border: 4px solid transparent;
    content: '';
    display: block;
    height: 0;
    width: 0;
  }
  th.sortable span:before {
    border-bottom-color: #e0e0e0;
    margin-top: 2px;
  }
  th.sortable span:after {
    border-top-color: #e0e0e0;
    margin-top: 2px;
  }
  th.active.sortable span.asc:before {
    border-bottom-color: #9e9e9e;
  }
  th.active.sortable span.desc:after {
    border-top-color: #9e9e9e;
  }
  th:not(.sortable) span {
    visibility: hidden;
  }
</style>

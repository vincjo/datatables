<script>
  import { fade } from 'svelte/transition';
  import TutorialCode from './TutorialCode.svelte';
  import Prism from 'prismjs';
  import CopyButton from './CopyButton.svelte';
  export let dataset;
  export let components;
  export let scrollY = true;
  export let width = 'auto';
  let current = 'code';
</script>

<div in:fade>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <ul>
    <li class:active={current === 'code'} on:click={() => (current = 'code')}>Code</li>
    <li class:active={current === 'result'} on:click={() => (current = 'result')}>Result</li>
    <li class:active={current === 'data'} on:click={() => (current = 'data')}>Data</li>
  </ul>
  <section
    class="thin-scrollbar"
    class:code={current === 'code' || current === 'data'}
    class:table={current === 'result'}
  >
    {#if current === 'result'}
      <div
        class="table z-depth-2"
        in:fade={{ duration: 200 }}
        style="width:{width};"
        class:scroll-y={scrollY}
      >
        <slot />
      </div>
    {:else if current === 'code'}
      <div class="code">
        <TutorialCode {components} />
      </div>
    {:else}
      <CopyButton code={dataset} />
      <div class="code thin-scrollbar">
        <pre class="language-javascript">
{@html Prism.highlight(dataset, Prism.languages.javascript)}
                </pre>
      </div>
    {/if}
  </section>
</div>

<style>
  div {
    height: inherit;
    max-width: 960px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    margin-bottom: 8px;
  }
  li {
    display: block;
    font-size: 16px;
    color: #676778;
    line-height: 32px;
    padding: 8px 0 0 0;
    margin: 0 24px 0 16px;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    transition: color, 0.1s;
    cursor: pointer;
  }
  li.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
  }
  section {
    min-height: 480px;
    height: auto;
    position: relative;
    overflow: auto;
    background: var(--hljs);
    border-radius: 8px;
  }
  section.table {
    background: #eee;
    padding: 0 10%;
    border-radius: 8px;
  }
  div.table {
    background: #fff;
    padding: 0;
    border-radius: 8px;
    margin: 24px auto 24px auto;
    height: auto;
  }
  div.table.scroll-y {
    height: calc(100vh - 224px);
    min-height: 432px;
  }
  div.code {
    padding: 0;
    background: #2f2f2f;
    position: relative;
    overflow: auto;
  }
</style>

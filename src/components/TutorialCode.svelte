<script>
  import Prism from 'prismjs';
  import 'prism-svelte';
  import CopyButton from './CopyButton.svelte';
  export let components;
  let active = components[0].name;
  let code = components[0].code;
  const setActive = (component) => {
    active = component.name;
    code = component.code;
  };
  const parse = (code) => {
    return code.replace('$lib/core', '@vincjo/datatables');
  };

  const icon = /*svg*/ `<svg width="100%" height="100%" viewBox="0 0 32 32"><path fill="currentColor" d="M26.1 5.7C23.5 2 18.4.9 14.7 3.2L8.2 7.4c-1.8 1.1-3 2.9-3.4 5c-.3 1.7 0 3.5.8 5.1c-.6.8-.9 1.8-1.1 2.8c-.4 2.1.1 4.3 1.4 6c2.6 3.7 7.7 4.8 11.4 2.5l6.5-4.2c1.8-1.1 3-2.9 3.4-5c.3-1.7 0-3.5-.8-5.1c.6-.8.9-1.8 1.1-2.8c.4-2.1-.1-4.3-1.4-6zM24.3 11c0 .2-.1.4-.2.6l-.1.4l-.3-.2c-.8-.6-1.6-1-2.6-1.3l-.2-.1v-.2c0-.3-.1-.7-.3-1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2L12 12.9c-.3.2-.5.5-.6.9c-.1.4 0 .8.2 1.1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2l2.5-1.6c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1 1 2.4.8 3.6c-.2 1.2-1 2.3-2 3L15.4 26c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.7-1-1-2.4-.8-3.6c0-.2.1-.4.2-.6L8 20l.3.2c.8.6 1.6 1 2.6 1.3l.2.1v.2c0 .3.1.7.3 1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2L20 19c.3-.2.5-.5.6-.9c.1-.4 0-.8-.2-1.1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2l-2.5 1.6c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.8-1-1-2.4-.8-3.6c.2-1.2 1-2.3 2-3l6.5-4.2c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1.1 1 2.4.8 3.6z"></path></svg>`;
</script>

<CopyButton {code} top={'56px'} />

<section>
  <nav class="thin-scrollbar-darken">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ul>
      {#each components as component}
        <li class:active={component.name === active} on:click={() => setActive(component)}>
          <i>{@html icon}</i>
          <span>{component.name}</span>
        </li>
      {/each}
    </ul>
  </nav>

  <aside class="thin-scrollbar">
    <pre class="language-svelte">
{@html Prism.highlight(parse(code), Prism.languages.svelte, 'svelte')}
        </pre>
  </aside>
</section>

<style>
  section {
    height: auto;
    width: 100%;
  }
  nav {
    position: relative;
    overflow-x: auto;
    width: 100%;
    height: 40px;
    background: #000;
    border: none;
    box-shadow: none;
    padding: 8px 4px 0px 4px;
  }
  ul {
    display: flex;
    align-items: flex-end;
    color: #9e9e9e;
    margin: 0;
    padding: 0 8px;
    list-style-type: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
      Geneva, Verdana, sans-serif;
    font-size: 12px;
    height: 100%;
  }
  li {
    cursor: pointer;
    padding: 2px 8px;
    transition: all, 0.2s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 32px;
    margin: 0 2px;
  }
  li:hover {
    background: #2f2f2f;
  }
  li.active {
    color: #e0e0e0;
    background: #2f2f2f;
  }

  aside {
    width: 100%;
  }

  li i {
    width: 16px;
    height: 16px;
    margin: 0 4px 0 0;
    color: #9e9e9e;
  }
  li.active i {
    color: var(--primary);
  }
</style>

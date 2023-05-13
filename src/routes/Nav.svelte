<script>
  import { slide, fade, fly } from 'svelte/transition';
  import pages from './Nav';
  import { getPath, url, anchor } from '$utils/page';
</script>

<nav class="thin-scrollbar" transition:fly={{ duration: 200, x: -200 }}>
  <a href="/datatables/home">
    <article>
      <aside transition:fade={{ duration: 100 }}>
        <img src="/datatables/logo.svg" alt="logo" />
        <div>
          <h1>svelte<br />simple<br />datatables</h1>
        </div>
      </aside>
    </article>
  </a>

  {#each pages as page}
    <a href={getPath(page.path)}>
      <h2
        class:active={$url === getPath(page.path) ||
          (getPath(page.path) !== '/' && $url.includes(getPath(page.path)))}
      >
        {page.name}
        {#if page.pages || page.anchors}
          <i class="micon">keyboard_arrow_down</i>
        {/if}
      </h2>
    </a>
    {#if page.pages && $url.includes(page.path)}
      <ul transition:slide|local={{ duration: 200 }}>
        {#each page.pages as subpage}
          <a href={getPath(page.path + subpage.path)}>
            <li class:active={$url === getPath(page.path + subpage.path)}>
              {subpage.name}
            </li>
          </a>
        {/each}
      </ul>
    {/if}
    {#if page.anchors && $url.includes(page.path)}
      <ul transition:slide={{ duration: 200 }}>
        {#each page.anchors as hash}
          <a href={hash.slug} on:click={() => ($anchor = hash.slug)}>
            <li class:active={$anchor === hash.slug}>
              {hash.name}
            </li>
          </a>
        {/each}
      </ul>
    {/if}
  {/each}
</nav>

<style>
  nav {
    position: relative;
    min-height: 100vh;
    width: 240px;
    min-width: 200px;
    background: #fff;
    z-index: 1;
    padding: 24px 0 0 24px;
    overflow-y: auto;
  }

  article {
    height: 88px;
  }
  aside {
    display: flex;
    justify-content: start;
    margin: 0;
    height: 48px;
  }
  aside h1 {
    font-size: 16px;
    line-height: 15px;
    text-align: left;
    font-weight: 400;
    margin: 0;
    color: #333;
  }
  aside img {
    width: 48px;
    margin: 0 8px;
  }

  h2 {
    color: #333;
    font-weight: 200;
    margin: 0;
    font-size: 32px;
    line-height: 40px;
    transition: all, 0.1s;
    white-space: nowrap;
  }
  h2 i {
    font-size: 18px;
  }
  h2:not(.active) i {
    color: #bdbdbd;
  }
  h2:hover {
    font-weight: 600;
    color: #676778;
  }
  h2.active {
    color: var(--primary);
    font-weight: 600;
  }
  a {
    text-decoration: none;
  }
  ul {
    margin: 4px 0 8px 0;
    list-style-type: none;
    background: #fff;
    padding: 0 16px 0 0;
    border-left: 1px dotted #bdbdbd;
  }
  ul li {
    display: block;
    background: #fff;
    transition: all, 0.2s;
    padding: 4px;
    font-size: 16px;
    color: #676778;
    font-weight: 400;
    line-height: 24px;
    border-radius: 2px;
    border: 1px solid transparent;
    border-right: 4px solid transparent;
    border-top: 1px solid #eee;
  }
  ul li:hover {
    font-weight: bold;
    background: #fafafa;
  }
  ul li.active {
    color: var(--secondary);
    font-weight: bold;
    background: #f5f5f5;
    /* border:1px solid #e0e0e0; */
    border-right: 4px solid var(--secondary);
  }
  /* ul li.active a {background:#fafafa;} */
  ul a {
    display: block;
    text-decoration: none;
    color: inherit;
    padding: 0px 8px;
  }

  /* ul li{clip-path:polygon(4% 3%, 100% 0, 86% 86%, 0 100%);} */
  /* ul li:nth-child(even){clip-path:polygon(0 0, 87% 14%, 100% 100%, 3% 99%)} */
</style>

<script>
  import Nav from './Nav.svelte';
  import Github from './Github.svelte';
  import NavButton from './NavButton.svelte';
  import { ModalContainer } from 'gros/modal';
  import { afterNavigate } from '$app/navigation';
  let element;

  afterNavigate(() => {
    if (element) element.scrollTop = 0;
  });
</script>

<svelte:head>
  <title>Datatables</title>
</svelte:head>

<Github />

<NavButton />

<ModalContainer />

<nav>
  <Nav />
</nav>
<section bind:this={element}>
  <article>
    <header />
    <slot />
    <footer />
  </article>
</section>

<style>
  nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 23vw;
    display: flex;
    justify-content: flex-end;
    border-right: 1px solid #e0e0e0;
  }
  section {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 77vw;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
    padding: 2%;
  }
  article {
    padding: 32px;
    width: auto;
    min-height: 100vh;
    background: #fff;
    width: 100%;
  }

  @media (max-width: 800px) {
    section {
      position: unset;
      width: 100%;
      padding: 16px 24px;
    }
    article {
      padding: 0;
      min-width: 200px;
    }
    nav {
      display: none;
    }
  }
  @media (min-width: 800px) {
    /* section{width:100%;padding:16px 24px;} */
    article {
      padding: 0;
      width: 100%;
      max-width: 1200px;
    }
  }
  header {
    width: 100%;
    height: 4vh;
  }
  footer {
    width: 100%;
    height: 4vh;
    margin-top: 40px;
  }
</style>

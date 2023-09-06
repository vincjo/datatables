<script>
    import Header from '$site/components/Header.svelte'
    import Nav from './Nav.svelte'
    import NavButton from './NavButton.svelte'
    import { afterNavigate } from '$app/navigation'
    let element

    afterNavigate(() => {
        if (element) element.scrollTop = 0
    })
</script>

<svelte:head>
    <title>Datatables</title>
    <link rel="icon" href="/favicon.png" />
</svelte:head>


<NavButton />

<nav>
    <Nav />
</nav>
<section bind:this={element}>
    <article>
        <slot />
    </article>
</section>

<style>
    nav {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 23vw;
        display: flex;
        justify-content: flex-end;
        border-right: 1px solid #e0e0e0;
        overflow-y: none;
    }
    section {
        width: auto;
        min-width: 960px;
        max-width: 1200px;
        margin-left: 23vw;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 24px 40px 2%;
    }
    article {
        width: auto;
        min-height: 100vh;
        background: #fff;
        width: 100%;
        margin: 0 40px;
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
</style>

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
    <Header/>
    <article>
        <slot />
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
        overflow-y: auto;
    }
    article {
        padding: 32px 24px 40px 2%;
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
</style>

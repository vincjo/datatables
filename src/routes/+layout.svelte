<script>
    import Header               from './Header.svelte'
    // import { ModalContainer }   from 'gros/modal'
    import { Loading }          from 'gros/loading'
    import { onMount }          from 'svelte'
    import { site }             from '$site'
    import { theme }            from 'gros/theme'
    import { browser }          from '$app/environment'

    theme.init()
    let { children } = $props()

    onMount(() => {
        const mode = site.getMode()
        site.setMode(mode)
    })
</script>


<Loading process/>
<!-- <ModalContainer/> -->

<main>
    <Header/>
    <section class="thin-scrollbar">
        {@render children()}
    </section>
</main>


<style>
    main {
        position: absolute;
        top:0;left:0;bottom:0;right:0;
        background: var(--bg);
        color: var(--font);
        transition: all, 0.4s;
        /* background-image: var(--bg-image); */
    }
    section {
        position: absolute;
        top: 56px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow-y: auto;
    }
</style>
<script>
    import Header from './Header.svelte'
    import ModalContainer from '$site/components/Modal_Container.svelte'
    import { Loading } from 'gros/loading'
    import { onMount } from 'svelte'
    import { site } from '$site'

    onMount(() => {
        const theme = site.getTheme()
        site.setTheme(theme)

        const mode = site.getMode()
        site.setMode(mode)
    })
</script>

<Loading process/>
<ModalContainer/>

<main>
    <Header/>
    <section class="thin-scrollbar">
        <slot/>
    </section>
</main>


<style>
    main {
        position: absolute;
        top:0;left:0;bottom:0;right:0;
        background: var(--bg);
    }
    section {
        position: absolute;
        top: 56px;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 0 32px;
        overflow-y: auto;
    }
</style>
<script>
    import Header from './Header.svelte'
    import { ModalContainer } from 'gros/modal'
    import { darkMode } from '$site/utils'
</script>


<ModalContainer/>

<main class:dark={$darkMode}>
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
        left: 32px;
        bottom: 0;
        right: 0;
        overflow-y: auto;
        padding: 0 32px;
    }
    @media (min-width: 1200px) {
        section {
            left: 96px;
        }
    }
</style>
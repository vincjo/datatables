<script>
    import Header from './Header.svelte'
    import { ModalContainer } from 'gros/modal'

</script>


<ModalContainer/>

<main>
    <Header/>
    <section>
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
    }
</style>
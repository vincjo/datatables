<script>
    import Header from './Header.svelte'
    import { ModalContainer } from 'gros/modal'
</script>


<ModalContainer/>

<Header/>
<main>
    <slot/>
</main>

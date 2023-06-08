<script>
<<<<<<< HEAD
    import Nav from './Nav.svelte'
    import Github from './Github.svelte'
    import NavButton from './NavButton.svelte'
    import { ModalContainer } from 'gros/modal'
    import { afterNavigate } from '$app/navigation'
    let element

    afterNavigate(() => {
        if (element) element.scrollTop = 0
    })
=======
    import Github from './Github.svelte'
    import { ModalContainer } from 'gros/modal'
>>>>>>> upstream/master
</script>


<Github/>
<ModalContainer/>
<slot/>


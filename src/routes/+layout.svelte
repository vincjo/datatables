<script>
    import Github from './Github.svelte'
    import { ModalContainer } from 'gros/modal'
</script>

<svelte:head>
    <title>Datatables</title>
    <link rel="stylesheet" href="/gros-theme.css" />
    <link rel="icon" href="/favicon.png" />
</svelte:head>


<Github/>
<ModalContainer/>
<slot/>


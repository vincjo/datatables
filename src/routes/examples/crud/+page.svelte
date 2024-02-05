<script>
    import Datatable from './Datatable.svelte'
    import data from '$site/data/data.75'
    import { users } from './store'
    import Intro from './intro.svx'
    import Doc from './doc.svx'

    $users = data
</script>

<section>
    <Intro/>
    <Datatable users={$users} />
    <Doc/>
</section>

<style>
    section {
        max-width: 1080px;
        margin: 0 auto;
        padding: 0 24px;
    }
</style>
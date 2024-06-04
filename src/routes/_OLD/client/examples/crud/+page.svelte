<script>
    import Datatable from './Datatable.svelte'
    import data from '$site/data/data.75'
    import { users } from './store'
    import Intro from './intro.svx'
    import Doc from './doc.svx'

    $users = data
</script>

<Intro/>
<Datatable users={$users} />
<Doc/>

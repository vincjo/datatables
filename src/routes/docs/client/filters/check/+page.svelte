<script>
    import Content from './content.svx'
    import Content2 from './content2.svx'
    import Main from '../Main.svelte'
    import { check } from '$lib/src/client'
</script>

<Content/>

<Main check={check.startsWith}/>

<Content2/>
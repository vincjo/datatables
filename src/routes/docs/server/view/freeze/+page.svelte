<script>
    import Content from './content.svx'
    import Main from './Main.svelte'
    let { data } = $props()
</script>

<Content/>
<Main data={data.dataset}/>
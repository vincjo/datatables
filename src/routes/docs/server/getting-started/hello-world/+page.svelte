<script>
    import Main from './Main.svelte'
    import Content from './content.svx'
    let { data } = $props()
</script>

<h1>Hello world</h1>

<Main data={data.dataset}/>

<Content/>
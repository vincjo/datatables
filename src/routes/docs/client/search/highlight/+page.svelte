<script>
    import Content  from './content.svx'
    import Example  from './Example.svelte'
    import Demo     from '$site/components/Demo.svelte'
    let { data } = $props()
</script>


<Content/>

<Demo {data}>
    <Example/>
</Demo>
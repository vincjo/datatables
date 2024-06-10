<script>
    import Content from './content.svx'
    import Main from '../Main.svelte'
</script>


<Content/>

<Main isHighlighted scoped={['id', 'last_name', 'first_name']}/>
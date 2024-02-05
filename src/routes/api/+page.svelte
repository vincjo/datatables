<script>
    import { mode } from '$site/utils'
    import { getPath } from 'gros/page'
    import { onMount } from 'svelte'

    const redirect = () => {
        window.location.replace(getPath(`/api/${$mode}`))
    }

    onMount(() => redirect())

</script>

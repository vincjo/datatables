<script>
    import { mode } from '$site/utils'
    import Client from './Client.svx'
    import Remote from './Remote.svx'
    export let data
</script>

{#if $mode === 'client'}
    <Client {data}/>
{:else}
    <Remote/>
{/if}
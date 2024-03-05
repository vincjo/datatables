<script>
    import { mode } from '$site/utils'
    import Client from './Client.svx'
    import Remote from './Remote.svx'
</script>

{#if $mode === 'client'}
    <Client/>
{:else}
    <Remote/>
{/if}
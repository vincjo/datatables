<script>
    import { Modal } from 'gros/modal'
    import { api } from './api.svelte'
    let { close, props } = $props()
</script>

<Modal title="Remove a user" icon="delete_forever">
    <aside>
        Are you sure you want to permanently delete the user "<strong
            >{props.first_name} {props.last_name}</strong
        >" ?
    </aside>

    {#snippet footer()}
        <button
            onclick={() => {
                api.destroy(props)
                close()
            }}>Delete</button
        >
        <button onclick={close}>Cancel</button>
    {/snippet}
</Modal>

<style>
    aside {
        margin: 40px 40px;
        width: 360px;
        color: #e57373;
        font-size: 14px;
    }
</style>
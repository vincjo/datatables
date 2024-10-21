<script lang="ts">
    import { Modal, type ModalProps } from 'gros/modal'
    import { Input } from 'gros/form'
    import { api } from './api.svelte'
    let { close, props }: ModalProps = $props()
</script>

<Modal title="Update a user" icon="edit">
    <aside>
        <Input icon="person" label="First name" bind:value={props.first_name} field="first_name" />
        <Input icon="person" label="Last name" bind:value={props.last_name} field="last_name" />
        <Input icon="mail" label="Email" bind:value={props.email} field="email" />
    </aside>

    {#snippet footer()}
        <button
            onclick={() => {
                api.update(props)
                close()
            }}>Update</button
        >
        <button onclick={close}>Cancel</button>
    {/snippet}
</Modal>

<style>
    aside {
        width: 360px;
        margin: 24px;
    }
</style>
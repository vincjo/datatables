<script lang="ts">
    import { Modal, type ModalProps } from 'gros/modal'
    import { Input } from 'gros/form'
    import { api } from './api.svelte'
    const form = { first_name: null, last_name: null, email: null }
    let { close }: ModalProps = $props()
</script>

<Modal title="Create a user" icon="person_add">
    <aside>
        <Input icon="person" label="First name" bind:value={form.first_name} field="first_name" />
        <Input icon="person" label="Last name" bind:value={form.last_name} field="last_name" />
        <Input icon="mail" label="Email" bind:value={form.email} field="email" />
    </aside>

    {#snippet footer()}
        <button
            onclick={() => {
                api.create(form)
                close()
            }}>Create</button
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
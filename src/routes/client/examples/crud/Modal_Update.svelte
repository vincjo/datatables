<script>
    import Modal from './Modal.svelte'
    import Input from './Input.svelte'
    import { update } from './store'
    let { close, props } = $props()
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
                update(props)
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
        background: var(--bg);
    }
</style>
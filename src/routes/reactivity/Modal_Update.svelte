<script>
    import { Modal } from 'gros/modal';
    import { Input } from 'gros/form';
    import { update } from './store';
    export let close;
    export let props;
</script>

<Modal title="Update a user" icon="edit">
    <aside>
        <Input icon="person" label="First name" bind:value={props.first_name} field="first_name" />
        <Input icon="person" label="Last name" bind:value={props.last_name} field="last_name" />
        <Input icon="mail" label="Email" bind:value={props.email} field="email" />
    </aside>

    <svelte:fragment slot="footer">
        <button
            on:click={() => {
                update(props);
                close();
            }}>Update</button
        >
        <button on:click={close}>Cancel</button>
    </svelte:fragment>
</Modal>

<style>
    aside {
        width: 360px;
        margin: 24px;
    }
</style>

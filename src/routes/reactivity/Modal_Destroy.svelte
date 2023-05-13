<script>
    import { Modal } from 'gros/modal';
    import { destroy } from './store';
    export let close;
    export let props;
</script>

<Modal title="Remove a user" icon="delete_forever">
    <aside>
        Are you sure you want to permanently delete the user "<strong
            >{props.first_name} {props.last_name}</strong
        >" ?
    </aside>

    <svelte:fragment slot="footer">
        <button
            on:click={() => {
                destroy(props);
                close();
            }}>Delete</button
        >
        <button on:click={close}>Cancel</button>
    </svelte:fragment>
</Modal>

<style>
    aside {
        margin: 40px 40px;
        width: 360px;
        color: #e57373;
        font-size: 14px;
    }
</style>

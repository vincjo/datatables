<script>
  import { Modal } from 'gros/modal';
  import { Input } from 'gros/form';
  import { create } from './store';
  const form = { first_name: null, last_name: null, email: null };
  export let close;
</script>

<Modal title="Create a user" icon="person_add">
  <aside>
    <Input icon="person" label="First name" bind:value={form.first_name} field="first_name" />
    <Input icon="person" label="Last name" bind:value={form.last_name} field="last_name" />
    <Input icon="mail" label="Email" bind:value={form.email} field="email" />
  </aside>

  <svelte:fragment slot="footer">
    <button
      on:click={() => {
        create(form);
        close();
      }}>Create</button
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

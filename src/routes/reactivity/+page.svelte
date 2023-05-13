<script>
  import Datatable from './Datatable.svelte';
  import data from '$data/data.75';
  import { users } from './store';
  import Reactivity from './reactivity.svx';

  $users = data;
</script>

<h2>Reactivity example with a simple CRUD</h2>

<section>
  <Datatable users={$users} />
</section>

<Reactivity />

<style>
  h2 {
    font-size: 24px;
    color: var(--secondary);
    font-weight: 400;
    margin: 16px 0 8px 0;
  }
</style>

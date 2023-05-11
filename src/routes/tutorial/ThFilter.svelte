<script>
  export let handler;
  export let filterBy = null;
  let value = '';
</script>

<th>
  <input
    type="text"
    placeholder="Filter"
    bind:value
    on:input={() => handler.filter(value, filterBy)}
  />
</th>

<style>
  input {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 24px;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
    background: inherit;
    outline: none;
    border-radius: 0;
    font-size: 14px;
  }
  input::placeholder {
    color: #bdbdbd;
    font-style: italic;
    font-size: 13px;
  }
  input:focus {
    outline: 1px solid #bdbdbd;
  }
</style>

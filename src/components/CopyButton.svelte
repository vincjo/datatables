<script>
  export let top = '16px';
  export let code;
  let buttonContent = 'Copy';

  const copy = () => {
    const content = code.replace('$lib/core', '@vincjo/datatables');
    navigator.clipboard.writeText(content).then(
      () => {
        buttonContent = 'Saved !';
        setTimeout(() => {
          buttonContent = 'Copy';
        }, 1000);
      },
      (err) => {
        console.error('Async: Could not copy text: ', err);
      }
    );
  };
</script>

<button style:top on:click={() => copy()}>{buttonContent}</button>

<style>
  button {
    position: absolute;
    z-index: 18;
    right: 16px;
    background: rgba(255, 255, 255, 0.3);
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all, 0.2s;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>

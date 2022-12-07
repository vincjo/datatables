<script>
    export let handler

    let value = ''
</script>

<input
    bind:value={value} 
    placeholder="Search..."
    on:input={() => handler.search(value)}
/>

<style>
    input{
        border:1px solid #e0e0e0;
        border-radius:4px;
        outline:none;
        padding:0 8px;
        line-height:24px;
        margin:0;
        height:24px;
        background:transparent;
        width:176px;
        transition:all, 0.1s;
    }
    input:focus {border:2px solid #e0e0e0;}
    input::placeholder {color:#9e9e9e;line-height:24px;}
</style>
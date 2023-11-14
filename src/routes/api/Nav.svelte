<script>
    import Category from './Nav_Category.svelte'
    export let data
    let value = ''
</script>


<nav>
    <input type="text" placeholder="Search..." spellcheck="false" bind:value/>
    <section class="thin-scrollbar">
        <Category data={data.methods} {value} category={'methods'}/>
        <Category data={data.types} {value} category={'types'}/>
    </section>
</nav>


<style>
    input {
        background: var(--bg);
        border: 1px solid var(--grey);
        color: var(--font);
        width: 100%;
    }
    nav {
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        width: 296px;
        padding: 24px 24px 24px 0;
        border-right: 1px solid var(--grey);
    }

    section {
        position: absolute;
        top: 80px;
        bottom: 24px;
        left: 0;
        right: 24px;
        overflow-y: auto;
        border-top: 1px dotted var(--grey);
    }
</style>
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
        background: #fff;
    }
    nav {
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        width: 24vw;
        background: #fff;
        padding: 24px 24px 24px 6vw;
        border-right: 1px solid #e0e0e0;
        background: #fafafa;
    }

    section {
        position: absolute;
        top: 80px;
        bottom: 24px;
        left: 6vw;
        right: 24px;
        overflow-y: auto;
        border-top: 1px dotted #9e9e9e;
    }
</style>
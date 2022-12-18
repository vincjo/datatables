<script>
    import Home from './home.svx'
</script>


<svelte:head>
    <title>svelte-simple-datatables</title>
</svelte:head>


<section>
    <aside>
        <img src="logo.svg" alt="logo"/>
        <div>
            <h1>svelte-simple-datatables</h1>
            <p>A toolkit to build some datatable components with Svelte</p>
            <div>
                <img src="https://img.shields.io/npm/dt/@vincjo/svelte-simple-datatables?color=%23b71540" alt="npm downloads"/>
                <img src="https://img.shields.io/npm/v/@vincjo/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
            </div>
        </div>
    </aside>

    <Home/>


</section>
<style>
    section{margin-left:80px;}
    aside{display:flex;justify-content:start;margin-top:32px;}
    h1 {font-size:32px;line-height:32px; text-align: left; font-weight:400; margin: 0; }
    img {width: 88px;max-width: 400px;margin: 0 16px 0 0;}
    p {margin:0;color:#676778;padding:0;line-height:32px;font-size:16px;}
    div img{width:96px;}
    /* h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;} */
    /* 40b3ff     ff3e00    676778*/
</style>
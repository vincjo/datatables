<script>
    import { slide, fade } from 'svelte/transition'
    import pages from './Nav'
    import { getPath, url } from '$utils/page'
    import logo from '$img/logo.svg'
</script>

<section class="thin-scrollbar">
    <article>
        {#if $url !== '/'}
        <aside transition:fade={{ duration:100 }}>
            <img src="{logo}" alt="logo"/>
            <div>
                <h1>svelte<br>simple<br>datatables</h1>
            </div>
        </aside>
        {/if}
    </article>

    {#each pages as page}
        <a href="{getPath(page.path)}">
            <h2 class:active={$url === page.path || (page.path !== '/' && $url.includes(page.path))}>
                {page.name}
            </h2>
        </a>
        {#if page.pages && $url.includes(page.path)}
        <ul transition:slide={{ duration:200}}>
            {#each page.pages as subpage}
                <li class:active={$url === getPath(page.path + subpage.path)}>
                    <a href="{getPath(page.path + subpage.path)}">{subpage.name}</a>
                </li>
            {/each}
        </ul>
        {/if}
    {/each}
</section>


<style>
    section{position:fixed;top:0;bottom:0;left:0;width:240px;background:#fff;z-index:1;padding:40px 0 0 40px;overflow-y:auto;}

    article{height:88px;}
    aside{display:flex;justify-content:start;margin:0;height:48px;}
	aside h1 {font-size:16px;line-height:15px; text-align:left; font-weight:400; margin: 0;color:#333 }
	aside img {width:48px;margin:0 8px;}

    h2{color:#333;font-weight:200;margin:0;font-size:32px;line-height:40px;transition:all,0.1s;}
    h2:hover{font-weight:600;color:#676778;}
    h2.active{color:#b71540;font-weight:600;}
    a{text-decoration:none;}
    ul{margin:0;list-style-type:none;background:#fff;padding:0 16px 0 0;}
    ul li{display:block;margin:0;background:#fff;transition:all,0.1s;padding:4px;font-size:16px;color:#676778;font-weight:400;line-height:24px;clip-path:polygon(4% 3%, 100% 0, 86% 86%, 0 100%);border-radius:8px;}
    li:nth-child(even){clip-path:polygon(0 0, 87% 14%, 100% 100%, 3% 99%)}
    ul li:hover{font-weight:bold;color:var(--label);}
    ul li.active{color:var(--active-dark);;font-weight:bold;background:#eee;}
    /* ul li.active a {background:#fafafa;} */
    ul a{display:block;text-decoration:none;color:inherit;padding:0px 8px;}
</style>
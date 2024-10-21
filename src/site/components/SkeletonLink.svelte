<script>
    export let remote = false
    const ssdLogo = remote ? 'logo-remote' : 'logo'
    const href = remote ? 'https://github.com/kmalloy24/simple-datatables-skeleton/tree/main/src/lib/components/server' : 'https://github.com/kmalloy24/simple-datatables-skeleton/tree/main/src/lib/components/client'
</script>

<a class="flex" href="{href}">
    <img src="/v1datatables/skeleton.svg" alt="skeleton + svg"/> <div>+</div> <img src="/v1datatables/{ssdLogo}.svg" alt="SSD logo"/> 
</a>
<i>By @kmalloy24</i>

<style>
    i {
        font-style: normal;
        font-family: JetBrains;
    }
    a {
        text-decoration: none;
        border: 2px dashed #e0e0e0;
        border-radius: 8px;
        padding: 16px 24px;
        font-size: 24px;
        font-family: JetBrains;
        background: #fafafa;
        transition: all, 0.2s;
        max-width: 372px;
    }
    a:hover {
        border: 2px dashed var(--secondary);
    }
    a img {
        height: 48px;
    }
    a div {
        margin: 0 24px;
    }
</style>
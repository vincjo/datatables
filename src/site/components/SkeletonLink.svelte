<script>
    export let remote = false
    const ssdLogo = remote ? 'logo-remote' : 'logo'
    const href = remote ? 'https://github.com/kmalloy24/simple-datatables-skeleton/tree/main/src/lib/components/server' : 'https://github.com/kmalloy24/simple-datatables-skeleton/tree/main/src/lib/components/client'
</script>

<a class="skeleton flex" href="{href}">
    <button class="btn">
        <img src="/datatables/skeleton.svg" alt="skeleton + svg"/> <div>+</div> <img src="/datatables/{ssdLogo}.svg" alt="SSD logo"/> 
    </button>
</a>
<i>By @kmalloy24</i>

<style>
    i {
        font-style: normal;
        font-family: JetBrains;
    }
    a.skeleton {
        text-decoration: none;
    }
    a.skeleton img {
        height: 48px;
    }
    a.skeleton div {
        margin: 0 24px;
    }
    a.skeleton button {
        border: 2px dashed #e0e0e0;
        border-radius: 8px;
        padding: 16px 24px;
        font-size: 24px;
        font-family: JetBrains;
        background: #fafafa;
    }
    a.skeleton button:hover {
        border: 2px dashed var(--secondary);
    }
</style>
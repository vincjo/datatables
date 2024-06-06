<script>
    export let remote = false
    const ssdLogo = remote ? 'logo-remote' : 'logo'
    const href = 'https://vincjo.fr/datatables.runes/'
</script>

<a class="flex" href="{href}">
    <img src="/datatables/runes.png" alt="runes" class="png"> <div>+</div> <img src="/datatables/{ssdLogo}.svg" alt="SSD logo"> 
</a>

<style>
    a {
        text-decoration: none;
        border: 2px dashed #e0e0e0;
        border-radius: 8px;
        padding: 16px 24px;
        font-size: 24px;
        font-family: JetBrains;
        background: #fafafa;
        max-width: 372px;
    }
    a:hover {
        border: 2px dashed var(--secondary);
    }
    a img.png {
        height: 45px;
    }
    a img:not(.png) {
        height: 48px;
    }
    a div {
        margin: 0 24px;
    }
    .png {
        border-radius: 8px;
    }
</style>
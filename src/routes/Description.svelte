<script>

    const checked = `<svg width="28px" height="28px" viewBox="0 0 24 24"><path fill="#4caf50" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12.475q.425 0 .713.288t.287.712t-.288.713t-.712.287H5v14h14v-6.5q0-.425.288-.712T20 11.5t.713.288t.287.712V19q0 .825-.587 1.413T19 21zm6.525-6.8l8.5-8.5q.275-.275.675-.275t.7.275t.3.7t-.3.725L12.225 16.3q-.3.3-.7.3t-.7-.3l-4.25-4.25q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z"/></svg>`
</script>

<section>
    <ul>
        <li>
            {@html checked}
            <span>Headless solution</span>
        </li>
        <li>
            {@html checked}
            <span>SSR friendly</span>
        </li>
        <li>
            {@html checked}
            <span>Typescript support</span>
        </li>
        <li>
            {@html checked}
            <span>No dependency</span>
        </li>
        <!-- <li>
            {@html checked}
            <span>&#5835; &#5828; &#5796; &#5815; &#5792; &#5872;</span>
        </li> -->
    </ul>
</section>

<style>
    section {
        position: absolute;
        border-radius: 8px;
        padding: 8px 16px;
        width: fit-content;
        top: 64px;
        right: 120px;
    }
    ul {
        padding: 0;
    }
    li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: Archivo;
        margin: 8px 0;
        font-size: 28px;
    }
    span {
        margin-left: 8px;
    }
    @media (width < 1256px) {
        section {
            display: none;
        }
    }
</style>
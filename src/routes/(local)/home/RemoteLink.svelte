<script>
    import { getPath } from 'gros/page'
</script>

<a href={getPath('/remote/home')}>
    <section class="flex">
        <div>
            <svg viewBox="0 0 512 512" width="100%" height="100%"><g><path fill="var(--secondary)" class="anime" d="M414.8,17.3H97.2c-10.7,0-19.4,8.7-19.4,19.4v69.6c0,10.7,8.7,19.4,19.4,19.4H249v32.7H97.2   c-10.7,0-19.4,8.7-19.4,19.4v69.6c0,10.7,8.7,19.4,19.4,19.4H249v32.7H97.2c-10.7,0-19.4,8.7-19.4,19.4v69.6   c0,10.7,8.7,19.4,19.4,19.4H249v18c2.3-0.4,4.6-0.6,7-0.6c2.4,0,4.7,0.2,7,0.6v-18h151.8c10.7,0,19.4-8.7,19.4-19.4v-69.6   c0-10.7-8.7-19.4-19.4-19.4H263v-32.7h151.8c10.7,0,19.4-8.7,19.4-19.4v-69.6c0-10.7-8.7-19.4-19.4-19.4H263v-32.7h151.8   c10.7,0,19.4-8.7,19.4-19.4V36.7C434.2,26,425.5,17.3,414.8,17.3z M136.4,360.5h-28.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h28.1   c3.9,0,7,3.1,7,7S140.3,360.5,136.4,360.5z M186.1,360.5h-28.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h28.1c3.9,0,7,3.1,7,7   S190,360.5,186.1,360.5z M381,330.9c12.5,0,22.6,10.1,22.6,22.6c0,12.5-10.1,22.6-22.6,22.6c-12.5,0-22.6-10.1-22.6-22.6   C358.4,341,368.5,330.9,381,330.9z M136.4,219.5h-28.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h28.1c3.9,0,7,3.1,7,7S140.3,219.5,136.4,219.5z    M186.1,219.5h-28.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h28.1c3.9,0,7,3.1,7,7S190,219.5,186.1,219.5z M381,189.8   c12.5,0,22.6,10.1,22.6,22.6s-10.1,22.6-22.6,22.6c-12.5,0-22.6-10.1-22.6-22.6S368.5,189.8,381,189.8z M136.4,78.5h-28.1   c-3.9,0-7-3.1-7-7s3.1-7,7-7h28.1c3.9,0,7,3.1,7,7S140.3,78.5,136.4,78.5z M186.1,78.5h-28.1c-3.9,0-7-3.1-7-7s3.1-7,7-7h28.1   c3.9,0,7,3.1,7,7S190,78.5,186.1,78.5z M381,94.1c-12.5,0-22.6-10.1-22.6-22.6c0-12.5,10.1-22.6,22.6-22.6s22.6,10.1,22.6,22.6   C403.7,84,393.5,94.1,381,94.1z"/><ellipse fill="var(--secondary)" class="anime" cx="256" cy="466.8" rx="27.8" ry="27.8"/><path fill="#2f2f2f" d="M406.3,439c-13,0-23.9,8.9-27,20.9c-0.3,0-0.6-0.1-0.9-0.1h-81.3c0.4,2.3,0.6,4.6,0.6,7s-0.2,4.7-0.6,7h81.3   c0.3,0,0.6,0,0.9-0.1c3.1,12,14,20.9,27,20.9c15.4,0,27.8-12.5,27.8-27.8C434.2,451.5,421.7,439,406.3,439z"/><path fill="#2f2f2f" d="M133.5,459.8c-0.3,0-0.6,0-0.9,0.1c-3.1-12-14-20.9-27-20.9c-15.4,0-27.8,12.5-27.8,27.8   c0,15.4,12.5,27.8,27.8,27.8c13,0,23.9-8.9,27-20.9c0.3,0,0.6,0.1,0.9,0.1h81.3c-0.4-2.3-0.6-4.6-0.6-7s0.2-4.7,0.6-7H133.5z"/></g></svg>
        </div>
        <p>
            If your data is paged on the <b>server side</b>, this library is probably not suitable for your needs.<br>
            Support for API interactions is under development
        </p>
    </section>
</a>


<style>
    .anime {
        animation: change 1s infinite;
    }
    @keyframes change {  
        0% { fill: #2f2f2f }
        20% { fill:var(--secondary-darken) }
        50% { fill:var(--ternary) }
        80% { fill:var(--secondary-darken) }
        100% { fill: #2f2f2f }
    }

    @keyframes rotate {
        0% { transform: rotate(0deg) }
        25% { transform: rotate(4deg) }
        50% { transform: rotate(0deg) }
        75% { transform: rotate(-4deg) }
    }

    div {
        min-width: 64px;
        animation: rotate 2s infinite;
        width: 96px; 
        height: 96px;
        margin-right: 24px;
    }
    section {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 8px 24px;
        position: relative;
        border: 2px dashed #e0e0e0;
        border-radius: 8px;
        margin: 24px 0;
        max-width: 600px;
        background: #fafafa;
        transition: border, 0.2s;
    }
    section:hover {
        border: 2px dashed var(--secondary);
    }
    section p {
        font-family: JetBrains;
        margin: 0;
    }
    section p b {
        font-size: 16px;
        color: var(--secondary);
    }
    a {
        text-decoration: none;
    }
</style>
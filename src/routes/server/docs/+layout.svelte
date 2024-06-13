<script>
    import Layout from '$site/components/docs/Layout.svelte'
    let { children } = $props()
    const root = `/server/docs`
    const nav = [
        {
            title: 'Getting started',
            links: [
                { name: 'Introduction'          , path: `${root}/getting-started/intro`       },
                { name: 'Hello World'           , path: `${root}/getting-started/hello-world` },
                { name: 'Internationalization'  , path: `${root}/getting-started/i18n`        },
            ]
        },
        // {
        //     title: 'Tips',
        //     links: [
        //         { name: `Sticky header`   , path: `${root}/tips/sticky-header`   },
        //     ]
        // },
    ]
</script>

<Layout {nav}>
    {@render children()}
</Layout>
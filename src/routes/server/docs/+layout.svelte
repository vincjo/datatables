<script>
    import Layout from '$site/components/docs/Layout.svelte'
    let { children } = $props()
    const root = `/server/docs`
    const nav = [
        {
            title: 'Getting started',
            icon: `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M2.5 5V3.116q0-.667.475-1.142t1.14-.474H6q.213 0 .356.144t.144.357t-.144.356T6 2.5H4.116q-.27 0-.443.173t-.173.443V5q0 .213-.144.356t-.357.144t-.356-.144T2.5 5m18 0V3.116q0-.27-.173-.443t-.442-.173H18q-.213 0-.356-.144t-.144-.357t.144-.356T18 1.5h1.885q.666 0 1.14.475t.475 1.14V5q0 .213-.144.356t-.357.144t-.356-.144T20.5 5m-18 15.885V19q0-.213.144-.356t.357-.144t.356.144T3.5 19v1.885q0 .269.173.442t.443.173H6q.213 0 .356.144t.144.357t-.144.356T6 22.5H4.116q-.667 0-1.141-.475t-.475-1.14M19.885 22.5H18q-.213 0-.356-.144t-.144-.357t.144-.356T18 21.5h1.885q.269 0 .442-.173t.173-.442V19q0-.213.144-.356t.357-.144t.356.144t.143.356v1.885q0 .666-.475 1.14t-1.14.475M6.5 17.884q0 .231.192.424t.423.192h9.77q.23 0 .423-.192t.192-.424V6.116q0-.231-.192-.424t-.424-.192H7.116q-.231 0-.424.192t-.192.424zm.616 1.616q-.691 0-1.153-.462T5.5 17.884V6.116q0-.691.463-1.153T7.116 4.5h9.769q.69 0 1.153.463t.462 1.153v11.769q0 .69-.462 1.153t-1.154.462zM10 9.5h4q.213 0 .356-.144t.144-.357t-.144-.356T14 8.5h-4q-.213 0-.356.144t-.144.357t.144.356T10 9.5m0 3h4q.213 0 .356-.144t.144-.357t-.144-.356T14 11.5h-4q-.213 0-.356.144t-.144.357t.144.356t.356.143m0 3h4q.213 0 .356-.144t.144-.357t-.144-.356T14 14.5h-4q-.213 0-.356.144t-.144.357t.144.356t.356.143m-3.5 2.385V5.5v13z"/></svg>`,
            links: [
                { name: 'Introduction'          , path: `${root}/getting-started/intro`       },
                { name: 'Overview'              , path: `${root}/getting-started/overview`    },
                // { name: 'Hello World'           , path: `${root}/getting-started/hello-world` },
                // { name: 'Internationalization'  , path: `${root}/getting-started/i18n`        },
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
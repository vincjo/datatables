<script>
    import Layout from '$site/components/docs/Layout.svelte'
    let { children } = $props()
    const root = `/components`
    const nav = [
        {
            title: 'Components',
            icon: `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18.385V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v12.77q0 .666-.475 1.14t-1.14.475H5.615q-.666 0-1.14-.475T4 18.386m1-9.231h14V5.616q0-.27-.173-.443T18.385 5H5.615q-.269 0-.442.173T5 5.616zm4.998 4.923h4.004v-3.923H9.998zm0 4.923h4.004v-3.923H9.998zM5 14.077h3.998v-3.923H5zm10.002 0H19v-3.923h-3.998zM5.616 19h3.382v-3.923H5v3.308q0 .269.173.442t.443.173m9.386 0h3.382q.27 0 .443-.173t.173-.442v-3.308h-3.998z"/></svg>`,
            links: [
                { name: 'Introduction'          , path: `${root}/introduction`                  },
                { name: 'Overview'              , path: `${root}/overview`                      },
                { name: 'Hello World'           , path: `${root}/getting-started/hello-world`   },
                // { name: 'Internationalization'  , path: `${root}/getting-started/i18n`        },
            ]
        },
        {
            title: 'Integration',
            icon: `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M8.116 16H13v-5.5H7.5v4.885q0 .23.192.423t.423.192M7.5 9.5h12V4.616q0-.231-.192-.424T18.884 4H8.116q-.231 0-.424.192t-.192.423zM14 16h4.885q.23 0 .423-.192t.192-.423V10.5H14zm-5.884 1q-.691 0-1.153-.462T6.5 15.385V4.615q0-.69.463-1.153T8.116 3h10.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T18.884 17zm-3 3q-.691 0-1.153-.462T3.5 18.385V6.615h1v11.77q0 .23.192.423t.423.192h11.77v1z"/></svg>`,
            links: [
                { name: 'Search input'          , path: `${root}/search/input`                },
                { name: 'Search scope'          , path: `${root}/search/scope`                },
                { name: 'Highlight results'     , path: `${root}/search/highlight`            },
                { name: 'Regular expression'    , path: `${root}/search/regex`                },
            ]
        },
        {
            title: 'Pagination',
            icon: `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m4.114 12.006l4.24 4.24q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267q-.053-.136-.053-.298t.053-.298t.184-.267l4.388-4.389q.146-.146.347-.156t.366.156t.166.357t-.165.357zm15.773-.012l-4.24-4.24q-.141-.14-.15-.344t.15-.364t.353-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.146.146-.344.153q-.198.006-.364-.159t-.165-.357q0-.191.165-.357z"/></svg>`,
            links: [
                { name: 'Pages'                 , path: `${root}/pagination/pages`                },
                { name: 'Navigation'            , path: `${root}/pagination/navigation`           },
                { name: 'Rows per page'         , path: `${root}/pagination/rows-per-page`        },
                { name: 'Row count'             , path: `${root}/pagination/row-count`            },
            ]
        },
    ]
</script>

<svelte:head>
    <title>svelte simple datatables - components</title>
    <meta name="description" content="Components documentation">
</svelte:head>

<Layout {nav}>
    {@render children()}
</Layout>
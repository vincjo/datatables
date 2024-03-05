<script>
    import Layout from '$site/components/docs/Layout.svelte'
    const root = `/client/docs`
    const nav = [
        {
            title: 'Getting started',
            links: [
                { name: 'Introduction'          , path: `${root}/getting-started/intro`       },
                { name: 'Hello World'           , path: `${root}/getting-started/hello-world` },
                { name: 'Internationalization'  , path: `${root}/getting-started/i18n`        },
            ]
        },
        {
            title: 'Filters',
            links: [
                { name: 'Comparators'           , path: `${root}/filters/comparators`         },
                { name: 'Multiple criteria'     , path: `${root}/filters/multiple-criteria`   },
            ]
        },
        {
            title: 'Column calculations',
            links: [
                { name: 'Sum'                   , path: `${root}/calculations/sum`           },
                { name: 'Average'               , path: `${root}/calculations/avg`           },
                { name: 'Distinct values'       , path: `${root}/calculations/distinct`      },
                { name: 'Bounds'                , path: `${root}/calculations/bounds`        },
            ]
        },
        {
            title: 'Tutorial',
            links: [
                { name: '1. HTML Table'    , path: `${root}/tutorial/html-table`    },
                { name: '2. Sorting'       , path: `${root}/tutorial/sorting`       },
                { name: '3. Filtering'     , path: `${root}/tutorial/filtering`     },
                { name: '4. Search'        , path: `${root}/tutorial/search`        },
                { name: '5. Rows per page' , path: `${root}/tutorial/rows-per-page` },
                { name: '6. Row count'     , path: `${root}/tutorial/row-count`     },
                { name: '7. Pagination'    , path: `${root}/tutorial/pagination`    },
            ]
        },
        {
            title: 'Tips',
            links: [
                { name: `Sticky header`   , path: `${root}/tips/sticky-header`   },
            ]
        },
    ]
</script>

<Layout {nav}>
    <slot/>
</Layout>
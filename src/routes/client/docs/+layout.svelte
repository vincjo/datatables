<script>
    import Layout from '$site/components/docs/Layout.svelte'
    let { children } = $props()
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
            title: 'Search',
            links: [
                { name: 'Search input'          , path: `${root}/search/input`                },
                { name: 'Search scope'          , path: `${root}/search/scope`                },
                { name: 'Highlight results'     , path: `${root}/search/highlight`            },
            ]
        },
        {
            title: 'Column sort',
            links: [
                { name: 'Sort button '          , path: `${root}/sort/button`                 },
                { name: 'Nested prop'           , path: `${root}/sort/nested`                 },
            ]
        },
        {
            title: 'Column filter',
            links: [
                { name: 'Filter input'          , path: `${root}/filters/input`               },
                { name: 'Check function'        , path: `${root}/filters/check`               },
                { name: 'Nested prop'           , path: `${root}/filters/nested`              },
                { name: 'Multiple criteria'     , path: `${root}/filters/criteria`            },
                { name: 'Highlight results'     , path: `${root}/filters/highlight`           },
            ]
        },
        {
            title: 'Row selection',
            links: [
                { name: 'Select a row'          , path: `${root}/select/row`                  },
                { name: 'Select all'            , path: `${root}/select/all`                  },
                { name: 'Select scope'          , path: `${root}/select/scope`                },
            ]
        },
        {
            title: 'Column calculation',
            links: [
                { name: 'Sum'                   , path: `${root}/calculation/sum`           },
                { name: 'Average'               , path: `${root}/calculation/avg`           },
                { name: 'Distinct values'       , path: `${root}/calculation/distinct`      },
                { name: 'Bounds'                , path: `${root}/calculation/bounds`        },
            ]
        },
        // {
        //     title: 'Tutorial',
        //     links: [
        //         { name: '1. HTML Table'    , path: `${root}/tutorial/html-table`    },
        //         { name: '2. Sorting'       , path: `${root}/tutorial/sorting`       },
        //         { name: '3. Filtering'     , path: `${root}/tutorial/filtering`     },
        //         { name: '4. Search'        , path: `${root}/tutorial/search`        },
        //         { name: '5. Rows per page' , path: `${root}/tutorial/rows-per-page` },
        //         { name: '6. Row count'     , path: `${root}/tutorial/row-count`     },
        //         { name: '7. Pagination'    , path: `${root}/tutorial/pagination`    },
        //     ]
        // },
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
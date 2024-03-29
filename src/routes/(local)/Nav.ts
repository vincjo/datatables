export default [
    {
        name: 'home',
        path: '/home'
    },
    {
        name: 'datatables',
        path: '/examples',
        pages: [
            { name: 'basic', path: '/basic' },
            { name: 'sticky', path: '/sticky' },
            { name: 'small', path: '/small' },
            { name: 'callback', path: '/callback' },
            { name: 'i18n', path: '/i18n' },
            { name: 'nested objects', path: '/nested-objects' },
            { name: 'blocks', path: '/blocks' },
            { name: 'row selection', path: '/row-selection' },
        ]
    },
    {
        name: 'reactivity',
        path: '/reactivity'
    },
    {
        name: 'filters',
        path: '/advanced-filters',
        pages: [
            { name: 'comparators', path: '/comparators' },
            { name: 'multiple criteria', path: '/multiple-criteria' }
        ]
    },
    {
        name: 'calculation',
        path: '/calculation',
        pages: [
            { name: 'sum', path: '/sum' },
            { name: 'average', path: '/avg' },
            { name: 'distinct', path: '/distinct' },
            { name: 'bounds', path: '/bounds' },
        ]
    },
    {
        name: 'api',
        path: '/api',
        anchors: [
            { name: 'get rows', slug: '#get-rows' },
            { name: 'set rows', slug: '#set-rows' },
            { name: 'sort', slug: '#sort' },
            { name: 'filter', slug: '#filter' },
            { name: 'search', slug: '#search' },
            { name: 'rows per page', slug: '#rows-per-page' },
            { name: 'row count', slug: '#row-count' },
            { name: 'pagination', slug: '#pagination' },
            { name: 'row selection', slug: '#row-selection' },
            { name: 'event', slug: '#event' }
        ]
    },
    {
        name: 'tutorial',
        path: '/tutorial',
        pages: [
            { name: 'html table', path: '/html-table' },
            { name: 'sort data', path: '/sort-data' },
            { name: 'filter data', path: '/filter-data' },
            { name: 'search', path: '/search' },
            { name: 'rows per page', path: '/rows-per-page' },
            { name: 'row count', path: '/row-count' },
            { name: 'pagination', path: '/pagination' }
        ]
    },
    {
        name: 'tips',
        path: '/tips',
        pages: [{ name: 'sticky header', path: '/sticky-header' }]
    }
]

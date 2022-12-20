export default [
    {
        name: 'home',
        path: '/',
    },
    {
        name: 'datatables',
        path: '/datatables',
        pages: [
            { name: 'basic', path: '/basic' },
            { name: 'sticky', path: '/sticky' },
            { name: 'small', path: '/small' },
            { name: 'callback', path: '/callback' },
            { name: 'i18n', path: '/i18n' },
        ],
    },
    {
        name: 'api',
        path: '/api',
        anchors: [
            { name: 'table rows', slug: '#table-rows' },
            { name: 'sort data', slug: '#sort-data' },
            { name: 'filter data', slug: '#filter-data' },
            { name: 'search', slug: '#search' },
            { name: 'rows per page', slug: '#rows-per-page' },
            { name: 'row count', slug: '#row-count' },
            { name: 'pagination', slug: '#pagination' },
            { name: 'detect a change', slug: '#detect-a-change' },
            { name: 'update dataset', slug: '#update-dataset' },
        ],
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
            { name: 'pagination', path: '/pagination' },
        ],
    },
]
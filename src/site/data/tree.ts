

const test = [
    {
        name: 'homepage',
        files: ['vincjo.fr', 'readme.md', 'license', 'github.com' ],
        folders: [
            {
                name: 'versions',
                files: ['2.0.0-runes.1', '2.0.0-runes.2', '2.0.0-runes.3', '2.0.0-runes.4', '2.0.0-runes.5', '2.0.0-runes.6', '2.0.0-runes.7']
            },
            {
                name: 'bugs',
                files: ['issues.txt', 'stackoverflow', 'github']
            }
        ]
    },
    {
        name: 'scripts',
        files: [ 'dev.sh', 'build.sh', 'preview.sh', 'package.sh', 'check.sh', 'check:watch.sh', 'format.sh', 'deploy.sh' ]
    }, 
    {
        name: 'dependencies',
        folders: [
            {
                name: 'dev',
                files: [ '@rollup/plugin-replace', '@sveltejs/adapter-node', '@sveltejs/kit', '@sveltejs/package', '@sveltejs/vite-plugin-svelte', '@types/node', 'dotenv', 'gros', 'mdsvex', 'prism-svelte', 'prismjs', 'svelte', 'svelte-check', 'svelte-preprocess', 'tslib', 'typescript', 'vite' ]
            },
            {
                name: 'peer',
                files: [ 'svelte^5.0.0-next.120' ]
            }
        ]
    },
    {
        name: 'exports',
        folders: [
            {
                name: 'src',
                folders: [
                    {
                        name: 'lib',
                        files: ['index.ts'],
                        folders: [
                            {
                                name: 'client',
                                files: ['TableHandler.svelte.ts', 'AbstractTableHandler.svelte.ts'],
                                folders: [
                                    {
                                        name: 'components',
                                        files: ['Th.svelte', 'ThFilter.svelte', 'Search.sevelte']
                                    }
                                ]
                            },
                            {
                                name: 'shared',
                                files: ['Datatable.svelte', 'RowsPerPage.svelte', 'RowCount.svelte', 'Pagination.svelte'],
                            },
                        ],
                    }
                ]
            }
        ]
    }
]



export default [
    {
        name: 'homepage',
        files: [
            { name: 'vincjo.fr' }, 
            { name: 'readme.md' }, 
            { name: 'license' }, 
            { name: 'github.com'} 
        ],
        folders: [
            {
                name: 'versions',
                files: [
                    { name: '2.0.0-runes.1' }, 
                    { name: '2.0.0-runes.2' }, 
                    { name: '2.0.0-runes.3' }, 
                    { name: '2.0.0-runes.4' }, 
                    { name: '2.0.0-runes.5' }, 
                    { name: '2.0.0-runes.6' }, 
                    { name: '2.0.0-runes.7' }
                ],
                folders: [
                    {
                        name: 'bugs',
                        files: [
                            { name: 'issues.txt' }, 
                        ]
                    },
                ]
            },
        ]
    },
    {
        name: 'exports',
        folders: [
            {
                name: 'src',
                folders: [
                    {
                        name: 'lib',
                        files: [
                            { name: 'index.ts' }
                        ],
                        folders: [
                            {
                                name: 'client',
                                files: [
                                    { name: 'TableHandler.svelte.ts' }, 
                                    { name: 'AbstractTableHandler.svelte.ts' },
                                ],
                                folders: [
                                    { 
                                        name: 'helpers',
                                        files: [
                                            { name: 'CalculationHelper.svelte.ts'},
                                            { name: 'AdvancedFilterHelper.svelte.ts'},
                                            { name: 'RecordFilterHelper.svelte.ts'},
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'shared',
                                files: [
                                    { name: 'Datatable.svelte' }, 
                                    { name: 'RowsPerPage.svelte' }, 
                                    { name: 'RowCount.svelte' }, 
                                    { name: 'Pagination.svelte' }, 
                                    { name: 'Th.svelte' }, 
                                    { name: 'ThFilter.svelte' }, 
                                    { name: 'Search.sevelte' }, 
                                ],
                            },
                        ],
                    }
                ]
            }
        ]
    },
    {
        name: 'scripts',
        files: [ 
            { name: 'dev.sh' }, 
            { name: 'build.sh' }, 
            { name: 'preview.sh' }, 
            { name: 'package.sh' }, 
            { name: 'check.sh' }, 
            { name: 'check:watch.sh' }, 
            { name: 'format.sh' }, 
            { name: 'deploy.sh' }, 
        ]
    }, 
    {
        name: 'dependencies',
        folders: [
            {
                name: 'dev',
                files: [ 
                    { name: '@rollup/plugin-replace' }, 
                    { name: '@sveltejs/adapter-node' }, 
                    { name: '@sveltejs/kit' }, 
                    { name: '@sveltejs/package' }, 
                    { name: '@sveltejs/vite-plugin-svelte' }, 
                    { name: '@types/node' }, 
                    { name: 'dotenv' }, 
                    { name: 'gros' }, 
                    { name: 'mdsvex' }, 
                    { name: 'prism-svelte' }, 
                    { name: 'prismjs' }, 
                    { name: 'svelte' }, 
                    { name: 'svelte-check' }, 
                    { name: 'svelte-preprocess' }, 
                    { name: 'tslib' }, 
                    { name: 'typescript' }, 
                    { name: 'vite' }, 
                ]
            },
            {
                name: 'peer',
                files: [ 
                { name: 'svelte^5.0.0-next.120' }
                ]
            }
        ]
    },
]
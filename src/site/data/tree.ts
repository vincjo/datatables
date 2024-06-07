

export default [
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
module.exports = {
    apps: [
        {
            name: 'datatables',
            script: './build/index.js',
            watch: false,
            max_restarts: 10,
            env: {
                NODE_ENV: 'production',
                PORT: 3010
            }
        }
    ],
    deploy: {
        production: {
            user: 'vincjo',
            host: ['vincjo.fr -p 625'],
            ref: 'origin/main',
            repo: 'git@github.com:vincjo/datatables.git',
            path: '/home/vincjo/www/datatables',
            'post-deploy':
                'npm install --force && npm run build && pm2 startOrRestart ecosystem.config.cjs --env production'
        }
    }
}

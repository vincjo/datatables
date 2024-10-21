module.exports = {
    apps: [
        {
            name: 'v1-datatables',
            script: './build/index.js',
            watch: false,
            max_restarts: 10,
            env: {
                NODE_ENV: 'production',
                PORT: 3015
            }
        }
    ],
    deploy: {
        production: {
            user: 'vincjo',
            host: ['vincjo.fr -p 625'],
            ref: 'origin/v1',
            repo: 'git@github.com:vincjo/datatables.git',
            path: '/home/vincjo/www/v1datatables',
            'post-deploy':
                'npm install && npm run build && pm2 startOrRestart ecosystem.config.cjs --env production'
        }
    }
}

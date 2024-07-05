import { dev } from '$app/environment'

export const load = async (url) => {
    if (!dev) {
        return {
            message: 'Document generation runs only in dev mode.',
            error: true,
        }
    }
    const mode = url.params.mode
    if (['client', 'server'].includes(mode) === false) {
        return {
            message: 'Wrong mode: use "client" or "server".',
            error: true,
        }
    }
    return {
        message: `Welcome to the documentation center`,
        error: false,
    }
}
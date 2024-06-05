import { dev } from '$app/environment'

export const load = async (url) => {
    if (!dev) {
        return {
            message: 'Document generation runs only in dev mode.',
            error: true,
        }
    }
    const mode = url.params.mode
    if (['client', 'remote'].includes(mode) === false) {
        return {
            message: 'Wrong mode: use "client" or "remote".',
            error: true,
        }
    }
    return {
        message: `Welcome to the documentation center`,
        error: false,
    }
}
import { dev } from '$app/environment'
import { API } from '$site/api'

export const load = async (url) => {
    if (!dev) {
        return {
            message: 'Document generation runs only in dev mode.'
        }
    }
    const mode = url.params.mode
    if (['client', 'remote'].includes(mode) === false) {
        return {
            message: 'Wrong mode: use "client" or "remote".'
        }
    }
    await API.generate(mode as 'client' | 'remote')
    return {
        message: `Documentation for ${mode} mode has been successfully generated.`
    }
}
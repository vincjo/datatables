import { API } from '$site/api'
import { dev } from '$app/environment'
import { internal } from '$site/api'

export const load = async (url) => {
    if (dev === false) return { nav: undefined, internal: internal }
    const mode = url.params.mode
    return { 
        nav: API.nav(mode),
        internal: internal
    }
}

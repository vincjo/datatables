import { API } from '$site/api'
import { internal } from '$site/api'

export const load = async (url) => {
    const mode = url.params.mode
    const nav = API.nav(mode)
    if (nav.error) {
        return {
            nav: {
                properties: [],
                methods: [],
                types: []
            }, 
            error: nav.error
        }
    }
    const { properties, methods, types } = nav
    return {
        nav: {
            properties: properties.filter((item: string) => internal.properties.includes(item) === false).sort(),
            methods   : methods.filter((item: string) => internal.methods.includes(item) === false).sort(),
            types     : types.filter((item: string) => internal.types.includes(item) === false).sort()
        }
    }
}

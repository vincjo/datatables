import { API } from '$site/api'
import { internal } from '$site/api'

export const load = async (url) => {
    const mode = url.params.mode
    const { properties, methods, types } = API.nav(mode)
    return {
        nav: {
            properties: properties.filter((item: string) => internal.properties.includes(item) === false).sort(),
            methods   : methods.filter((item: string) => internal.methods.includes(item) === false).sort(),
            types     : types.filter((item: string) => internal.types.includes(item) === false).sort()
        }
    }
}

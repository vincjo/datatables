import { internalFilter } from '$site'
import { dev } from '$app/environment'


export const load = async ({ params }) => {
    if (!dev) return { nav: {} }
    
    const mode = params.mode
    const response = await fetch(`http://localhost:3333/document/nav?mode=${mode}`)
    const { properties, methods, types } = await response.json()

    return {
        nav: {
            properties: internalFilter(properties, 'properties'),
            methods   : internalFilter(methods, 'methods'),
            types     : internalFilter(types, 'types')
        }
    }
}
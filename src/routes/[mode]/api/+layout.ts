import { internalFilter } from '$site'

export const load = async ({ params }) => {

    const mode = params.mode
    const response = await fetch(`BASE_URL/${mode}/nav.json`)
    const { properties, methods, types } =  await response.json()
    return {
        nav: {
            properties: internalFilter(properties, 'properties'),
            methods   : internalFilter(methods, 'methods'),
            types     : internalFilter(types, 'types')
        }
    }
}

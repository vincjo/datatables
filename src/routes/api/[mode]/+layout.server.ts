import { internalFilter } from '$site'

export const load = async ({ params }) => {
    const response = await fetch(`BASE_URL/${params.mode}/nav.json`)
    if (response.status !== 200) {
        return { nav: { properties: [], methods: [], types: [] }}
    }
    const { properties, methods, types } =  await response.json()
    return {
        nav: {
            properties: internalFilter(properties, 'properties'),
            methods   : internalFilter(methods, 'methods'),
            types     : internalFilter(types, 'types')
        }
    }
}

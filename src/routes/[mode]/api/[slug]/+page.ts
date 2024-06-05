

export const load = async ({ params }) => {

    const mode = params.mode
    const [key, name] = params.slug.split('~')

    const page = await fetch(`BASE_URL/${mode}/${key}.${name}.json`)

    return {
        page: await page.json()
    }
}
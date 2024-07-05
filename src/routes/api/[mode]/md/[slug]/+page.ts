

export const load = async ({ params }) => {

    const mode = params.mode
    const [key, name] = params.slug.split('~')

    const page = await fetch(`http://localhost:3333/document/markdown?mode=${mode}&key=${key}&name=${name}`)
    return {
        page: await page.json()
    }
}
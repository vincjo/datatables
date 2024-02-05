import { TSParser } from '$site/utils'

export const load = async (param) => {
    const mode = param.params.mode
    const parser = new TSParser()
    const methods = await parser.methods(`./src/lib/${mode}/DataHandler.ts`)
    const types = await parser.types(`./src/lib/${mode}/index.ts`)

    return {
        parser: { types, methods }
    }
}

import PATH_URL from './const/path'

const pages: string[] = []

Object.values(PATH_URL).forEach((url) => {
    pages.push(url.slice(1))
})

export default defineAppConfig({
    pages,
    window: {},
    requiredPrivateInfos: [],
    permission: {},
    darkmode: true,
})

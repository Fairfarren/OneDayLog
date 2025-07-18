import PATH_URL from './const/path'

const pages: string[] = []

Object.values(PATH_URL).forEach((url) => {
    pages.push(url.slice(1))
})

export default defineAppConfig({
    pages,
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
    },
    requiredPrivateInfos: [],
    permission: {},
})

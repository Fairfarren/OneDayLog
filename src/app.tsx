import QueryProvider from '@/components/globalConfig/queryProvider'
import { clearUserInfo, toSetCode } from '@/store/user'
import './app.scss'
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useDidShow } from '@tarojs/taro'
import { useEffect } from 'react'

if (typeof globalThis.AbortController === 'undefined') {
    // 简单的空实现，避免报错
    // @ts-ignore
    globalThis.AbortController = () => ({
        abort: () => {},
        signal: {},
    })
}

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (err) => {
            if (err.code === 'RES_CODE.EXPIRE') {
                clearUserInfo()
                toSetCode()
            }
        },
    }),
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

function App(props) {
    useEffect(() => {
        console.log('===首次进入页面===')
        wx.loadFontFace({
            global: true,
            family: 'JDZhengHT-Bold',
            scopes: ['webview', 'native'],
            source: 'url("https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/9dddc333df972a35ae615b29d052b127.ttf")',
        })
        wx.loadFontFace({
            global: true,
            family: 'JDZhengHT-Light',
            scopes: ['webview', 'native'],
            source: 'url("https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/79beeb3aed0b0c2f924c926f752ee17b.ttf")',
        })
        wx.loadFontFace({
            global: true,
            family: 'JDZhengHT-Regular',
            scopes: ['webview', 'native'],
            source: 'url("https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/0bea5bb8878eea4a3f92cbc3435a8f91.ttf")',
        })
    }, [])

    useDidShow((e) => {
        console.log('===新进页面===', e)
    })

    return (
        <QueryClientProvider client={queryClient}>
            <QueryProvider>{props.children}</QueryProvider>
        </QueryClientProvider>
    )
}

export default App

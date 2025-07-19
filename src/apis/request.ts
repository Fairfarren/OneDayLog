import { RES_CODE } from '@/apis/const'
import { useStoToken } from '@/store/user'
import { showToast } from '@/utils'
import { request } from '@tarojs/taro'
import qs from 'qs'

type METHOD = 'POST' | 'GET' | 'DELETE' | 'PUT'

function api<T>(params: {
    method: METHOD
    url: string
    data?: object
    params?: object
}) {
    return new Promise<T>((resolve, reject) => {
        ;(async () => {
            const token = useStoToken.getState().value
            let queryStr = ''
            if (params.params) {
                queryStr = `?${qs.stringify(params.params)}`
                delete params.params
            }
            const url = process.env.NODE_HOST + params.url + queryStr
            const options = {
                header: { Authorization: token },
                ...params,
                url,
            }
            request(options)
                .then((res) => {
                    if (process.env.NODE_ENV !== 'development') {
                        console.log(`===接口返回,url:${options.url}===`)
                        console.log(options)
                        console.log(res.data)
                        console.log('===end接口返回===')
                    }
                    if (RES_CODE.SUCCESS === res.data.code) {
                        resolve(res.data.data)
                    } else {
                        if (RES_CODE.EXPIRE === res.data.code) {
                            showToast({
                                title: '登录过期或失效，正在重新登录',
                                icon: 'none',
                            })
                        } else {
                            if (!params.url.includes('getUserInfo')) {
                                showToast({
                                    title: res.data?.message || '网络错误',
                                    icon: 'none',
                                    duration: 1500,
                                })
                            }
                        }
                        reject(res.data)
                    }
                })
                .catch((err) => {
                    showToast({
                        title: '网络错误',
                        icon: 'error',
                        duration: 1500,
                    })
                    reject(err)
                })
        })()
    })
}

export function get<T>(params: {
    url: string
    data?: object
    header?: object
}) {
    const response = api<T>({
        method: 'GET',
        ...params,
    })
    return response
}

export function post<T>(params: { url: string; data?: object }) {
    const response = api<T>({
        method: 'POST',
        ...params,
    })
    return response
}

export function apiDelete<T>(params: { url: string; params?: object }) {
    const response = api<T>({
        method: 'DELETE',
        ...params,
    })
    return response
}

export function put<T>(params: { url: string; params?: object }) {
    const response = api<T>({
        method: 'PUT',
        ...params,
    })
    return response
}

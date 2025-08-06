import { RES_CODE } from '@/apis/const'
import { useUserInfo } from '@/store/user'
import { showToast } from '@/utils'
import { cloud } from '@tarojs/taro'
import qs from 'query-string'

type METHOD = 'POST' | 'GET' | 'DELETE' | 'PUT'

function api<T>(params: {
    method: METHOD
    url: string
    data?: object
    params?: object
}) {
    return new Promise<T>((resolve, reject) => {
        ;(async () => {
            cloud
                .callContainer({
                    config: {
                        env: 'prod-0gdadaalcff6b8a7',
                    },
                    path:
                        params.method === 'GET'
                            ? `${params.url}?${qs.stringify(params.params || {})}`
                            : params.url,
                    header: {
                        'X-WX-SERVICE': 'test',
                        'content-type': 'application/json',
                    },
                    method: params.method,
                    data: params.data,
                })
                .then((res) => {
                    if (res.statusCode === RES_CODE.SUCCESS) {
                        resolve(res.data as T)
                        return
                    } else if (res.statusCode === RES_CODE.EXPIRE) {
                        showToast({
                            title: '登录已过期，请重新登录',
                            icon: 'error',
                        })
                        useUserInfo.getState().reset()
                    } else {
                        showToast({
                            title: res.data.message || '请求失败',
                            icon: 'error',
                        })
                    }
                    reject(res.data)
                })
        })()
    })
}

export function get<T>(url: string, params?: object) {
    return api<T>({ method: 'GET', url, params })
}

export function post<T>(url: string, data?: object) {
    return api<T>({ method: 'POST', url, data })
}

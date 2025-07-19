import Taro, {
    getStorage,
    setStorage,
    showToast as TaroShowToast,
} from '@tarojs/taro'
import qs from 'qs'

/**
 * 信息提示
 * @param props
 * @param props.title 提示信息
 * @param props.icon 图标
 * @param props.duration 持续时间
 */
export function showToast({
    title,
    icon,
    duration = 1500,
}: {
    title: string
    icon?: 'success' | 'error' | 'loading' | 'none'
    duration?: number
}) {
    return new Promise((resolve) => {
        TaroShowToast({
            title,
            icon: icon || 'none',
            duration,
            mask: true,
        }).then(() => {
            setTimeout(() => {
                resolve(true)
            }, duration)
        })
    })
}

const hasModal = { value: false }

/**
 * 确定弹窗
 * @param props
 * @param props.title 提示标题
 * @param props.content 提示内容
 */
export function showModal({
    title = '提示',
    content,
}: {
    title?: string
    content: string
}) {
    return new Promise((resolve, reject) => {
        console.log('in showModal', hasModal)
        if (hasModal.value) {
            return
        }

        hasModal.value = true
        Taro.showModal({
            title,
            content,
            confirmColor: '#01ce9a',
        }).then((res) => {
            if (res.confirm) {
                resolve(true)
            } else {
                console.log('showModal => error')
                reject('取消')
            }
            hasModal.value = false
        })
    })
}

/**
 * 页面跳转
 * @param path
 * @param params
 */
export function navigateTo(path: string, params?: object) {
    return new Promise((resolve) => {
        Taro.navigateTo({
            url: `${path}?${qs.stringify(params)}`,
            success() {
                resolve(true)
            },
        })
    })
}

/**
 * 页面重定向
 * @param path
 * @param params
 */
export function redirectTo(path: string, params?: object) {
    return new Promise((resolve) => {
        Taro.redirectTo({
            url: `${path}?${qs.stringify(params)}`,
            success() {
                resolve(true)
            },
        })
    })
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 */
export function reLaunch(path: string, params?: object) {
    return new Promise((resolve) => {
        Taro.reLaunch({
            url: `${path}?${qs.stringify(params)}`,
            success() {
                resolve(true)
            },
        })
    })
}

/**
 * 加载中
 * @param {string} title
 */
export function showLoading({ title }) {
    Taro.showLoading({
        title,
        mask: true,
    })
}

/**
 * taro中自定义storage
 */
export const withStoreConfig = {
    getItem: async (key) => {
        try {
            const data = await getStorage({ key })
            return data.data
        } catch (err) {
            console.log(err)
            return false
        }
    },
    setItem: (key, newValue) => {
        setStorage({
            key,
            data: newValue,
        })
    },
    removeItem(key) {
        setStorage({
            key,
            data: false,
        })
    },
}

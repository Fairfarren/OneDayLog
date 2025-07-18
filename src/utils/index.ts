import API_URL from '@/apis/const'
import { get } from '@/apis/request'
import PATH_URL from '@/const/path'
import Taro, {
    type Canvas,
    createSelectorQuery,
    getCurrentPages,
    getStorage,
    setStorage,
} from '@tarojs/taro'
import crypto from 'crypto-js'
import dayjs from 'dayjs'
import { Base64 } from 'js-base64'
import qs from 'qs'
import { useRef } from 'react'

const formatNumber = (n) => {
    const s = n.toString()
    return s.padStart(2, '0')
}
/**
 * 格式化日期
 * @param dateStr 日期字符串
 * @param format 格式化方式，yyyy-MM-dd hh:mm
 */
export const ormatTime = (dateStr, format = 'yyyy-MM-dd hh:mm') => {
    if (!dateStr) {
        return ''
    }

    const time = dateStr.replace(/-/g, '/')
    const date = new Date(time)
    return format
        .replace('yyyy', date.getFullYear().toString())
        .replace('MM', formatNumber(date.getMonth() + 1))
        .replace('dd', formatNumber(date.getDate()))
        .replace('hh', formatNumber(date.getHours()))
        .replace('mm', formatNumber(date.getMinutes()))
        .replace('ss', formatNumber(date.getSeconds()))
}

/**
 * 格式化金钱
 * @param _money
 * @return {number} 小于10返回小数点后2位，小于1000返回小数点后1位，其他返回整数
 */
export const formatMoney = (_money) => {
    const money = _money ? Number.parseFloat(_money) : 0
    let num = 0
    if (money < 10) {
        num = Number.parseFloat(money.toFixed(2))
    } else if (money < 1000) {
        num = Number.parseFloat(money.toFixed(1))
    } else {
        num = Number.parseInt(String(money))
    }
    return num
}

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
        Taro.showToast({
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

const OSSConfig = {
    uploadHost: 'https://remember-quick.oss-cn-chengdu.aliyuncs.com', // OSS上传地址
    ossParams: {
        region: 'oss-cn-chengdu',
        bucket: 'remember-quick',
    },
}

// 计算签名。
function computeSignature(accessKeySecret: string, canonicalString: string) {
    return crypto.enc.Base64.stringify(
        crypto.HmacSHA1(canonicalString, accessKeySecret),
    )
}

function policyText() {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    return {
        expiration: date.toISOString(), // 设置policy过期时间。
        conditions: [
            // 限制上传大小。
            ['content-length-range', 0, 1024 * 1024 * 1024],
        ],
    }
}

async function getFormDataParams() {
    const credentials = await get<{
        accessKeyId: string
        accessKeySecret: string
        expiration: string
        securityToken: string
    }>({ url: API_URL.GET_TOKEN })
    const policy = Base64.encode(JSON.stringify(policyText())) // policy必须为base64的string。
    const signature = computeSignature(credentials.accessKeySecret, policy)
    const formData = {
        OSSAccessKeyId: credentials.accessKeyId,
        signature,
        policy,
        'x-oss-security-token': credentials.securityToken,
    }
    return formData
}

/**
 * 上传图片到cdn
 * @param {string} fileUrl 图片地址
 * @param {boolean} isAvatar 是否是头像
 */
export function uploadOSS(fileUrl: string, isAvatar = false) {
    return new Promise<string>((resolve, reject) => {
        if (fileUrl.includes('remember-quick.oss')) {
            resolve(fileUrl)
            return
        }
        ;(async () => {
            const filePath = isAvatar ? 'avatar' : 'tem'
            try {
                const formData = await getFormDataParams()
                const nameArr = fileUrl.split('/')
                const name = nameArr[nameArr.length - 1]
                Taro.uploadFile({
                    url: OSSConfig.uploadHost, // 开发者服务器的URL。
                    filePath: fileUrl,
                    name: 'file', // 必须填file。
                    formData: {
                        ...formData,
                        key: `${filePath}/${name}`,
                    },
                    success: (res) => {
                        if (res.statusCode === 204) {
                            console.log('上传成功')
                            resolve(
                                `${OSSConfig.uploadHost}/${filePath}/${name}`,
                            )
                        }
                    },
                    fail: (err) => {
                        showToast({
                            title: '上传头像失败',
                            icon: 'error',
                        })
                        console.log(err)
                        reject(new Error('上传失败'))
                    },
                })
            } catch (e) {
                console.log(e)
                reject(new Error('上传文件错误-100'))
            }
        })()
    })
}

/**
 * 格式化金额,小数点后2位
 * @param {?number} theNum 金额
 */
export function price(_theNum?: number | string) {
    const theNum = Number(_theNum)
    const num = (theNum || 0).toString()
    const first = num.split('.')[0]
    const end = num.split('.')[1]
    let reNumber = ''
    // const res = /\B(?=(\d{3})+(?!\d))/g
    reNumber = first // .replace(res, ',')
    return formatMoney(
        reNumber !== 'Infinity'
            ? reNumber + (end ? `.${end.slice(0, 2)}` : '')
            : 0,
    )
}

/*
 指定位置金额小数点保留两位
 */
export function priceNum(_money) {
    const money = _money ? Number.parseFloat(_money) : 0
    let num = 0
    if (money % 1 !== 0) {
        // 四舍五入到两位小数
        num = Math.round(money * 100) / 100
    } else {
        num = money
    }
    return num
}

/**
 * 创建画布
 * @param id 画布id
 * @param params
 * @param params.w 画布宽度
 * @param params.h 画布高度
 */
export function createCanvas(id: string, params: { w: number; h: number }) {
    return new Promise<{ canvas: Canvas; ctx: CanvasRenderingContext2D }>(
        (resolve) => {
            Taro.createSelectorQuery()
                .select(id || '#myCanvas')
                .fields({
                    node: true,
                    size: true,
                })
                .exec((res) => {
                    const canvas = res[0].node
                    canvas.width = params.w
                    canvas.height = params.h
                    const ctx = canvas.getContext('2d')
                    resolve({
                        canvas,
                        ctx,
                    })
                })
        },
    )
}

/**
 * 获取画布的图片地址
 * @param canvas 画布实例
 * @return {Promise<string>} 画布图片地址
 */
export function getCanvasUrl(canvas) {
    return new Promise<string>((resolve) => {
        Taro.canvasToTempFilePath({
            width: canvas.width,
            height: canvas.height,
            destWidth: canvas.width,
            destHeight: canvas.height,
            canvas,
            fileType: 'jpg',
            success(res) {
                resolve(res.tempFilePath)
            },
            fail(err) {
                Taro.hideLoading()
                console.log(err)
            },
        })
    })
}

/**
 * 在画布上画图像
 * @param cav
 * @param ctx
 * @param url
 * @param info
 * @param info.x
 * @param info.y
 * @param info.w
 * @param info.h
 */
export function drawImg(
    cav: unknow,
    ctx: unknow,
    url: string,
    info: { x: number; y: number; w: number; h: number },
) {
    return new Promise((resolve) => {
        const image = cav.createImage()
        image.src = url
        image.onload = () => {
            ctx.drawImage(image, info.x, info.y, info.w, info.h)
            resolve('')
        }
    })
}

/**
 * 在画布上写字
 * @param ctx 画布
 * @param params
 * @param params.text 文字
 * @param params.x x
 * @param params.y y
 */
export function writeText(
    ctx: unknow,
    params: { text: string; x: number; y: number },
) {
    return new Promise((resolve) => {
        const textWidth = ctx.measureText(params.text).width
        ctx.fillText(params.text, params.x, params.y)
        resolve(textWidth)
    })
}

/**
 * 获取画布中文字宽度
 * @param ctx
 * @param text
 */
export function getTextWidth(
    ctx: CanvasRenderingContext2D,
    text: string,
): Promise<number> {
    return new Promise((resolve) => {
        let width = 0
        width += ctx.measureText(text).width
        resolve(width)
    })
}

/**
 * 生成小程序码
 * @param path 地址
 * @returns {Promise<File>} 图片文件
 */
export function getWechatCode(path = PATH_URL.INDEX) {
    return new Promise<string>((resolve) => {
        Taro.downloadFile({
            url: `${process.env.NODE_HOST}${API_URL.CREATE_QR_CODE}?envVersion=${
                process.env.NODE_HOST.includes('api.xiongxin.top')
                    ? 'release'
                    : 'trial'
            }&path=${encodeURIComponent(path)}`,
            success: (res) => {
                resolve(res.tempFilePath)
            },
        })
    })
}

/**
 * 省略号文字
 * @returns string
 */
export function formatText(
    /** * 文字内容 */
    text: string,
    [
        /** * 最大长度 */
        maxLength,
        /** * 省略号后长度 */
        sliceLength,
        /** * 省略号前长度 */
        beforeLength = 0,
    ]: [number, number, number],
) {
    if (text && !text.includes('undefined')) {
        return text.length > maxLength
            ? `${text.slice(0, beforeLength || sliceLength)}...${
                  sliceLength > 0 ? text.slice(-sliceLength) : ''
              }`
            : text
    }
    return ''
}

/**
 * 获取底部悬浮框整体高度
 */
export function getButtonBtnHeight(): Promise<number> {
    return new Promise((resolve) => {
        const query = createSelectorQuery()
        query
            .select('#bottomBtn')
            .boundingClientRect((res) => {
                const data = Array.isArray(res) ? res[0] : res
                resolve(data?.height || 0)
            })
            .exec()
    })
}

/**
 * 二维码扫描
 */
export function scanCode(): Promise<object | string> {
    return new Promise((resolve, reject) => {
        Taro.scanCode({
            onlyFromCamera: true,
            scanType: ['qrCode', 'wxCode'],
        })
            .then((res) => {
                console.log(res)
                if (res.scanType === 'WX_CODE') {
                    const pages = Taro.getCurrentPages()
                    const pageUrl = pages[pages.length - 1].route || ''
                    const inHome = pageUrl.includes('pages/index/index')
                    if (res.path && inHome) {
                        if (res.path.includes('qrcode=1')) {
                            const search = res.path.split('?')[1]
                            const objSearch = qs.parse(search || '{}')
                            resolve(objSearch)
                        } else {
                            navigateTo(res.path)
                        }
                    } else {
                        reject(new Error('小程序码没有path'))
                    }
                } else {
                    try {
                        const content = JSON.parse(res.result.trim())
                        console.log(content)
                        resolve(content)
                    } catch (err) {
                        console.log(err)
                        resolve(res.result.trim())
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                showToast({
                    title: '识别失败',
                    icon: 'error',
                })
            })
    })
}

/**
 * 防抖节流
 * @param delay 再次执行时间
 */
export function useSleep(delay?: number) {
    const sleep = useRef(false)

    function startSleep(cb: () => void) {
        return new Promise((resolve) => {
            if (sleep.current) {
                return
            }
            sleep.current = true
            setTimeout(() => {
                sleep.current = false
                resolve(true)
            }, delay || 1000)
            cb()
        })
    }

    return { sleep: startSleep }
}

/**
 * 是否过期
 */
export function isTimeout(expireTime: string) {
    if (expireTime) {
        const nowDate = dayjs()
        return nowDate >= dayjs(expireTime)
    }
    return false
}

/**
 * 计算坐标之间距离
 * @param {number} lat1 A纬度
 * @param {number} lon1 A经度
 * @param {number} lat2 B纬度
 * @param {number} lon2 B经度
 * @return {string} 距离，保留2位小数，单位KM
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180
    }

    const earthRadiusKm = 6371

    const dLat = degreesToRadians(lat2 - lat1)
    const dLon = degreesToRadians(lon2 - lon1)

    const lat1Rad = degreesToRadians(lat1)
    const lat2Rad = degreesToRadians(lat2)

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1Rad) *
            Math.cos(lat2Rad)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return (earthRadiusKm * c).toFixed(2)
}

/**
 * 生成随机id
 */
export function generateRandomId(props?: { isShort?: boolean }) {
    const str = Date.now().toString()
    const timestamp = str.toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return (props?.isShort ? timestamp : '') + random
}

/**
 * 手机号隐藏中间4位
 * @param {string} text 文字
 * @param {number} start 起点
 * @param {number} number 隐藏几个
 * @param {string} b 替换文字
 */
export function hiddenText(text, start, number, b = '*') {
    return text
        .split('')
        .map((char, index) => {
            if (index >= start && index < start + number) {
                return b
            }

            return char
        })
        .join('')
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

/**
 * 获取前一个路由地址
 */
export function getRoutePath(): string {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
}

/**
 * 最少停留时间
 */
export function useMinStayTime(time = 800) {
    let minStayTimeTime = useRef(0)
    let minStayTimeTimer = useRef<NodeJS.Timeout>()

    async function minStayTime(cb: () => Promise<unknown>) {
        if (minStayTimeTime.current > 0) {
            return
        }
        const num = 30
        clearInterval(minStayTimeTimer.current)
        minStayTimeTimer.current = setInterval(() => {
            minStayTimeTime.current += num
        }, num)
        await cb()
        clearInterval(minStayTimeTimer.current)
        const diffTime = time - minStayTimeTime.current
        if (diffTime) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    minStayTimeTime.current = 0
                    resolve(true)
                }, diffTime)
            })
        }
        return true
    }

    return {
        minStayTime,
    }
}

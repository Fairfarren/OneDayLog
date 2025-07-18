import iconLoading from '@/assets/icon/loading.svg'
import PATH_URL from '@/const/path'
import { useUserInfo } from '@/store/user'
import { Share as AShare, type ShareProps } from '@taro-react-tools/components'
import { View } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import classnames from 'classnames'
import { memo, useEffect } from 'react'

export const shareOption = {
    title: '我在用小熊配货宝，自动打印配货单，好用！点击领积分！',
    imageUrl:
        'https://remember-quick.oss-cn-chengdu.aliyuncs.com/bear/share.png',
    path: PATH_URL.INDEX,
}
/**
 * 分享
 * @param {string?} className
 */
export const Share = memo((props: ShareProps) => {
    const router = useRouter()

    async function buttonShareBefore(e) {
        if (e.target.dataset?.type === 'shareCard') {
            return {
                ...shareOption,
                path:
                    PATH_URL.SHARE_POINTS +
                    `?userId=${useUserInfo.getState().id}`,
            }
        }
        return props.promise?.(e)
    }

    useEffect(() => {
        console.log('===router.params===')
        console.table(router.params)
        console.log('===router.params end===')
    }, [])

    return (
        <>
            <AShare
                {...props}
                promise={buttonShareBefore}
                shareOption={{ ...shareOption, ...props.shareOption }}
                loadingImg={iconLoading}
            >
                {props.children}
            </AShare>
            <View
                className={classnames('fixed', 'top-0', 'left-0', 'z-[999999]')}
            >
                {/*<DiyWindows />*/}
            </View>
        </>
    )
})

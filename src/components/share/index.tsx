import PATH_URL from '@/const/path'
import { Share as AShare, type ShareProps } from '@taro-react-tools/components'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

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
    async function buttonShareBefore(e) {
        if (e.target.dataset?.type === 'shareCard') {
            return {
                ...shareOption,
            }
        }
        return props.promise?.(e)
    }

    return (
        <>
            <AShare
                {...props}
                className={classnames('bg-base-100', props.className)}
                promise={buttonShareBefore}
                shareOption={{ ...shareOption, ...props.shareOption }}
            >
                {props.children}
            </AShare>

            <View
                className={classnames('fixed', 'top-0', 'left-0', 'z-[999999]')}
            ></View>
        </>
    )
})

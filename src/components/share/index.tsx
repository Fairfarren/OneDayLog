import iconLoading from '@/assets/icon/loading.svg'
import DiyHeader from '@/components/diyWindows'
import PATH_URL from '@/const/path'
import { useTime } from '@/store/time'
import { Share as AShare, type ShareProps } from '@taro-react-tools/components'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { memo, useEffect, useState } from 'react'

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
    const [scrollTop, setScrollTop] = useState('')

    async function buttonShareBefore(e) {
        if (e.target.dataset?.type === 'shareCard') {
            return {
                ...shareOption,
            }
        }
        return props.promise?.(e)
    }

    useEffect(() => {
        useTime.subscribe(() => {
            setScrollTop('backTop')
            setTimeout(() => {
                setScrollTop('')
            }, 300)
        })
    }, [])

    return (
        <>
            <AShare
                {...props}
                className={classnames(props.className)}
                scrollIntoView={scrollTop}
                promise={buttonShareBefore}
                shareOption={{ ...shareOption, ...props.shareOption }}
                loadingImg={iconLoading}
            >
                <>
                    <View id="backTop" />
                    {props.children}
                </>
            </AShare>

            <View>
                <DiyHeader />
            </View>
        </>
    )
})

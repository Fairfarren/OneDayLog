import { Overlay } from '@nutui/nutui-react-taro'
import type { TaroOverlayProps } from '@nutui/nutui-react-taro/dist/es/types'
import { Image, View } from '@tarojs/components'
import classnames from 'classnames'
import iconCloseWhite from '@/assets/icon/close.svg'

function DiyPop(
    props: Partial<TaroOverlayProps> & {
        onClose: () => void
    },
) {
    return (
        <Overlay {...props}>
            <View
                className={classnames(
                    'w-full',
                    'h-full',
                    'flex',
                    'flex-col',
                    'items-center',
                    'justify-center',
                )}
            >
                {props.children}
                <View className={classnames('mt-12', 'text-center')}>
                    <Image
                        src={iconCloseWhite}
                        className={classnames('w-[96px]', 'h-[96px]')}
                        onClick={props.onClose}
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default DiyPop

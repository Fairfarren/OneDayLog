import { useWindowsConfig, WindowType } from '@/store/system'
import { Overlay } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { memo, ReactNode } from 'react'
import ChoiceData from './ChoiceData'

function DiyWindows() {
    const windowsConfig = useWindowsConfig()

    const obj: {
        [T in WindowType]?: ReactNode
    } = {
        [WindowType.选择日期]: <ChoiceData />,
    }

    return (
        <Overlay visible={windowsConfig.visible} lockScroll>
            <View
                className={classnames(
                    'w-full',
                    'h-full',
                    'flex',
                    'items-center',
                    'justify-center',
                )}
                onClick={() => windowsConfig.close()}
            >
                {windowsConfig.type !== null && obj[windowsConfig.type]}
            </View>
        </Overlay>
    )
}

export default memo(DiyWindows)

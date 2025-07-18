import { View } from '@tarojs/components'
import classnames from 'classnames'

function NoMore() {
    return (
        <View
            className={classnames(
                'text-center',
                'text-gray-text',
                'text-[24px]',
                'py-2',
            )}
        >
            没有更多啦
        </View>
    )
}

export default NoMore

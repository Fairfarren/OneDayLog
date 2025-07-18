import { Text, View } from '@tarojs/components'
import classnames from 'classnames'

function NoAny(props?: { text?: string }) {
    return (
        <View className={classnames('text-center')}>
            <Text
                className={classnames('text-[#D4DDEB]', 'text-[36px]', 'mt-3')}
            >
                {props?.text || '暂无数据'}
            </Text>
        </View>
    )
}

export default NoAny

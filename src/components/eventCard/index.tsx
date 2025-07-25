import { Text, View } from '@tarojs/components'
import classnames from 'classnames'

function EventCard() {
    return (
        <View className={classnames('box')}>
            <View
                className={classnames('text-xl', 'font-bold', 'text-primary')}
            >
                <Text>这里是事件名称</Text>
            </View>
            <View
                className={classnames(
                    'mt-2',
                    'text-lg',
                    'w-full',
                    'truncate',
                    'text-opacity-80',
                )}
            >
                这里是副标题这里是副标题这里是副标题这里是副标题这里是副标题这里是副标题
            </View>
            <View className={classnames('mt-2', 'flex', 'flex-wrap', 'gap-2')}>
                {Array.from(Array(10).keys()).map((_, i) => (
                    <View
                        className={classnames('badge', 'badge-neutral')}
                        key={i}
                    >
                        # 标签{i}
                    </View>
                ))}
            </View>
        </View>
    )
}

export default EventCard

import { useGetEventList } from '@/hooks/event'
import { useEventInfo } from '@/store/event'
import { ShareElement, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

function List() {
    const eventInfo = useEventInfo()
    const { formatList } = useGetEventList()

    return (
        <View className={classnames('mt-3', 'grid', 'gap-4', 'px-2')}>
            {formatList?.map((item, i) => (
                <View
                    key={i}
                    className={classnames(
                        'box',
                        'indicator',
                        '!w-full',
                        '!block',
                    )}
                    onClick={(e) => {
                        e.stopPropagation()
                        eventInfo.open({
                            title: item.title,
                        })
                    }}
                >
                    <Text className="indicator-item badge badge-primary">
                        {item.total}
                    </Text>
                    <ShareElement
                        transform
                        mapkey={item.title}
                        className={classnames(
                            'text-3xl',
                            'font-bold',
                            'text-primary',
                        )}
                    >
                        <Text>{item.title}</Text>
                    </ShareElement>
                    <View className={classnames('text-base', 'mt-2')}>
                        最近一次：{item.time}
                    </View>
                </View>
            ))}
        </View>
    )
}

export default memo(List)

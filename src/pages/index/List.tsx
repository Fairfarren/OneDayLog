import { useGetEventList } from '@/hooks/event'
import { useEventInfo } from '@/store/event'
import { Text, View } from '@tarojs/components'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

function List() {
    const eventInfo = useEventInfo()
    const { list } = useGetEventList()

    const formatList = useMemo(() => {
        const map = new Map()
        list?.forEach((item) => {
            if (map.has(item.title)) {
                map.set(item.title, [...map.get(item.title), item])
            } else {
                map.set(item.title, [item])
            }
        })
        return map.size > 0
            ? Array.from(map).map((item) => ({
                  title: item[0],
                  total: item[1].length,
                  time: dayjs(item[1][0].createdAt).format('YYYY-MM-DD'),
              }))
            : []
    }, [list])

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
                        eventInfo.open()
                    }}
                >
                    <Text className="indicator-item badge badge-primary">
                        {item.total}
                    </Text>
                    <View
                        className={classnames(
                            'text-3xl',
                            'font-bold',
                            'text-primary',
                        )}
                    >
                        <Text>{item.title}</Text>
                    </View>
                    <View className={classnames('text-base', 'mt-2')}>
                        最近一次：{item.time}
                    </View>
                </View>
            ))}
        </View>
    )
}

export default memo(List)

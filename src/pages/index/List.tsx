import EventCard from '@/components/eventCard'
import { useEventInfo } from '@/store/event'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

function List() {
    const eventInfo = useEventInfo()

    return (
        <View className={classnames('mt-3')}>
            {Array.from(Array(10).keys()).map((_, i) => (
                <EventCard
                    onClick={(e) => eventInfo.open(e)}
                    key={i}
                    data={{
                        title: `标题-${i}`,
                        sub: `${i}-描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述`,
                        id: i + '',
                        tag: Array.from(Array(i).keys()).map(
                            (_, i) => i + '-标签',
                        ),
                    }}
                    showShadow
                />
            ))}
        </View>
    )
}

export default memo(List)

import EventCard from '@/components/eventCard'
import { useGetEventList } from '@/hooks/event'
import { useEventInfo } from '@/store/event'
import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { memo } from 'react'

function List() {
    const eventInfo = useEventInfo()
    const time = useTime()

    const { list } = useGetEventList({
        startTime: dayjs(time.choiceDay).format('YYYY-MM-DD 00:00:00'),
        endTime: dayjs(time.choiceDay).format('YYYY-MM-DD 23:59:59'),
    })

    return (
        <View className={classnames('mt-3')}>
            {list?.map((item, i) => (
                <EventCard
                    onClick={(e) => eventInfo.open(e)}
                    key={i}
                    data={item}
                    showShadow
                />
            ))}
        </View>
    )
}

export default memo(List)

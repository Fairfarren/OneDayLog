import EventCard from '@/components/eventCard'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

function List() {
    console.log('list')

    return (
        <View className={classnames('mt-3')}>
            {Array.from(Array(10).keys()).map((_, i) => (
                <EventCard key={i} />
            ))}
        </View>
    )
}

export default memo(List)

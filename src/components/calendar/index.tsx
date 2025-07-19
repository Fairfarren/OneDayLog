import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'

function Calendar() {
    const time = useTime()

    return (
        <View className={classnames('box', 'bg')}>
            <View className={classnames('text-center', 'text-2xl')}>
                {time.year} - {time.month}
            </View>
        </View>
    )
}

export default Calendar

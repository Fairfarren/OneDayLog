import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'

function TimeTitle() {
    const time = useTime()

    return (
        <View className={classnames('text-center', 'text-2xl', 'text-primary')}>
            {time.year} - {time.month}
        </View>
    )
}

export default TimeTitle

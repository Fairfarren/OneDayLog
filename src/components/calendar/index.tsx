import DaysCom from '@/components/calendar/daysCom'
import TimeTitle from '@/components/calendar/timeTitle'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import Week from './week'

function Calendar() {
    return (
        <View className={classnames('box', 'bg', 'text-center')}>
            <TimeTitle />

            <Week />

            <DaysCom />
        </View>
    )
}

export default Calendar

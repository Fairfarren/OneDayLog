import Calendar from '@/components/calendar'
import TimeTitle from '@/components/calendar/timeTitle'
import DiyHeader from '@/components/diyHeader'
import { Share } from '@/components/share'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import List from './List'

const Index = () => {
    return (
        <Share>
            <DiyHeader>
                <View className={classnames('text-2xl', 'font-bold')}>
                    <TimeTitle />
                </View>
            </DiyHeader>
            <View className={classnames('container')}>
                <Calendar />
                <List />
                <View className="occupy-bottom" />
            </View>
        </Share>
    )
}

export default Index

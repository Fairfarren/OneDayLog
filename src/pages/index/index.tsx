import Calendar from '@/components/calendar'
import TimeTitle from '@/components/calendar/timeTitle'
import DiyHeader from '@/components/diyHeader'
import PageContainerEvent from '@/components/PageContainerEvent'
import { Share } from '@/components/share'
import { useEventInfo } from '@/store/event'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import AddFixed from './AddFixed'
import List from './List'

const Index = () => {
    return (
        <>
            <Share>
                <DiyHeader>
                    <View className={classnames('text-2xl', 'font-bold')}>
                        <TimeTitle />
                    </View>
                </DiyHeader>
                <View className={classnames('container')}>
                    <Calendar />
                    <List />
                    <AddFixed onClick={() => useEventInfo.getState().open()} />
                    <View className="occupy-bottom" />
                </View>
            </Share>
            <PageContainerEvent />
        </>
    )
}

export default Index

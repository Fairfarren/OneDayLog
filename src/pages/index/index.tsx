import Calendar from '@/components/calendar'
import DiyHeader from '@/components/diyHeader'
import EventCard from '@/components/eventCard'
import { Share } from '@/components/share'
import { Text, View } from '@tarojs/components'
import classnames from 'classnames'

const Index = () => {
    return (
        <Share>
            <DiyHeader>
                <View
                    className={classnames(
                        'text-base-content',
                        'text-2xl',
                        'font-bold',
                    )}
                >
                    <Text>一日所记</Text>
                </View>
            </DiyHeader>
            <View className={classnames('container')}>
                <Calendar />
                <View className={classnames('mt-3')}>
                    {Array.from(Array(10).keys()).map((_, i) => (
                        <EventCard key={i} />
                    ))}
                </View>
                <View className="occupy-bottom" />
            </View>
        </Share>
    )
}

export default Index

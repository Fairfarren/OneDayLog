import Calendar from '@/components/calendar'
import DiyHeader from '@/components/diyHeader'
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
                        'font-bole',
                    )}
                >
                    <Text>一日所记</Text>
                </View>
            </DiyHeader>
            <View className={classnames('container')}>
                <Calendar />
            </View>
        </Share>
    )
}

export default Index

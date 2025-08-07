import DiyHeader from '@/components/diyHeader'
import PageContainerEvent from '@/components/PageContainerEvent'
import { Share } from '@/components/share'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import AddFixed from './AddFixed'
import List from './List'
import TopTime from './TopTime'

const Index = () => {
    return (
        <>
            <Share>
                <DiyHeader></DiyHeader>
                <View className={classnames('container')}>
                    <TopTime />
                    <List />
                    <AddFixed />
                    <View className="occupy-bottom" />
                </View>
            </Share>
            <PageContainerEvent />
        </>
    )
}

export default Index

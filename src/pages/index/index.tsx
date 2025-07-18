import DiyHeader from '@/components/diyHeader'
import { Share } from '@/components/share'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { Context, useIndex } from './track'

const Index = () => {
    const value = useIndex()

    return (
        <Context.Provider value={value}>
            <Share className={classnames()}>
                <DiyHeader noBar>
                    <View
                        className={classnames(
                            'flex',
                            'items-center',
                            'justify-center',
                            'text-white',
                            'font-bold',
                            'text-[36px]',
                        )}
                    >
                        小熊智能助手
                    </View>
                </DiyHeader>
                <View className={classnames('container')}>index</View>
                <View className="occupy-bottom" />
            </Share>
        </Context.Provider>
    )
}

export default Index

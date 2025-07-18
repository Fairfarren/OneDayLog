import { ButtonClear } from '@/components/layoutButton'
import { Text, View } from '@tarojs/components'
import classnames from 'classnames'
import Style from './index.module.scss'

function ShareCard() {
    return (
        <ButtonClear
            openType="share"
            data-type="shareCard"
            className={classnames(
                'box-white',
                'box-border',
                'h-[316.368px]',
                'relative',
                '!mt-3',
                Style.card,
            )}
        >
            <View
                className={classnames(
                    'w-full',
                    'flex',
                    'items-center',
                    'justify-between',
                    'text-[28px]',
                    'absolute',
                    'left-0',
                    'bottom-0',
                    'px-3',
                )}
            >
                <View>
                    <Text
                        className={classnames(
                            'font-JDZhengHT-Bold',
                            'text-red',
                            'text-[36px]',
                        )}
                    >
                        32
                    </Text>
                    <Text className={classnames('text-gray-8c')}>
                        人参与助力
                    </Text>
                </View>
                <View className={classnames('text-blue')}>
                    <Text className={classnames('text-[28px]')}>
                        累计获取积分:
                    </Text>
                    <Text
                        className={classnames(
                            'text-[36px]',
                            'font-JDZhengHT-Bold',
                        )}
                    >
                        1200
                    </Text>
                </View>
            </View>
        </ButtonClear>
    )
}

export default ShareCard

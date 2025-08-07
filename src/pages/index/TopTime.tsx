import { Text, View } from '@tarojs/components'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

function TopTime() {
    const [time, setTime] = useState(dayjs())

    useEffect(() => {
        setTimeout(() => {
            setTime(dayjs())
        }, 1000)
    }, [time])

    return (
        <View
            className={classnames(
                'grid',
                'grid-cols-[3fr_2fr]',
                'gap-3',
                'border-b-2',
                'border-solid',
                'border-accent-content',
                'border-opacity-50',
                'py-4',
                'px-3',
                'font-mono',
            )}
        >
            <View
                className={classnames(
                    'border-r-2',
                    'border-solid',
                    'border-accent-content',
                    'border-opacity-50',
                    'font-bold',
                )}
            >
                <View className={classnames('text-xl')}>
                    {time.format('dddd')}
                </View>
                <View className={classnames('text-7xl', 'mt-3')}>
                    <View className="countdown">
                        <Text
                            style={{
                                '--value': time.month() + 1,
                            }}
                        ></Text>
                    </View>
                </View>
                <View className={classnames('text-3xl', 'mt-1')}>
                    {time.format('MMMM')}
                </View>
            </View>
            <View
                className={classnames(
                    'flex-2',
                    'flex',
                    'items-center',
                    'justify-center',
                )}
            >
                <View className={classnames('text-2xl')}>
                    <View className="countdown">
                        <Text
                            style={{
                                '--value': time.hour(),
                            }}
                        ></Text>
                        :
                        <Text
                            style={{
                                '--value': time.minute(),
                            }}
                        ></Text>
                        :
                        <Text
                            style={{
                                '--value': time.second(),
                            }}
                        ></Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TopTime

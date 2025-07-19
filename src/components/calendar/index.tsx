import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'

const titleList = ['日', '一', '二', '三', '四', '五', '六']

function Calendar() {
    const time = useTime()

    console.log(time)
    return (
        <View className={classnames('box', 'bg', 'text-center')}>
            <View
                className={classnames(
                    'text-center',
                    'text-2xl',
                    'text-primary',
                )}
            >
                {time.year} - {time.month}
            </View>

            <View
                className={classnames(
                    'mt-2',
                    'grid',
                    'grid-cols-7',
                    'kbd',
                    'kbd-md',
                    'bg-base-100',
                )}
            >
                {titleList.map((item, i) => (
                    <View key={i} className={classnames()}>
                        {item}
                    </View>
                ))}
            </View>

            <View
                className={classnames('mt-2', 'grid', 'grid-cols-7', 'gap-2')}
            >
                {Array(time.firstDayOfMonth)
                    .fill(null)
                    .map((_day, i) => (
                        <View key={i} />
                    ))}
                {time.days.map((day) => {
                    const monthDay = `${time.month}-${day}`
                    return (
                        <View
                            key={day}
                            className={classnames(
                                'kbd',
                                'kbd-md',
                                'bg-base-100',
                                'transition',
                                time.getDoubleDay() === monthDay
                                    ? classnames('rounded-full', 'bg-secondary')
                                    : classnames(
                                          time.choiceDay === monthDay &&
                                              'bg-base-content text-base-100 rounded-full',
                                          time.day === monthDay &&
                                              'text-secondary border-secondary',
                                      ),
                            )}
                            onClick={() => {
                                time.update({
                                    choiceDay: monthDay,
                                })
                            }}
                        >
                            {day}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default Calendar

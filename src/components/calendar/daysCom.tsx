import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { useMemo } from 'react'

function DaysCom() {
    const time = useTime()

    const timeDay = useMemo(() => {
        return `${time.month}-${time.day}`
    }, [time])

    const getDoubleDay = useMemo(() => {
        return time.choiceDay === timeDay ? timeDay : false
    }, [timeDay, time])

    return (
        <View className={classnames('mt-2', 'grid', 'grid-cols-7', 'gap-2')}>
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
                            getDoubleDay === monthDay
                                ? classnames('rounded-full', 'bg-secondary')
                                : classnames(
                                      time.choiceDay === monthDay &&
                                          'bg-base-content text-base-100 rounded-full',
                                      timeDay === monthDay &&
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
    )
}

export default DaysCom

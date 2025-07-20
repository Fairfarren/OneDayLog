import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { useMemo } from 'react'

function DaysCom() {
    const time = useTime()

    const getDoubleDay = useMemo(() => {
        return time.choiceDay === time.today ? time.today : false
    }, [time])

    return (
        <View className={classnames('mt-2', 'grid', 'grid-cols-7', 'gap-2')}>
            {Array(time.firstDayOfMonth)
                .fill(null)
                .map((_day, i) => (
                    <View key={i} />
                ))}
            {time.days.map((day) => {
                const accountDay = `${time.year}-${time.month}-${day}`
                return (
                    <View
                        key={day}
                        className={classnames(
                            'kbd',
                            'kbd-md',
                            'bg-base-100',
                            'transition',
                            getDoubleDay === accountDay
                                ? classnames('rounded-full', 'bg-secondary')
                                : classnames(
                                      time.choiceDay === accountDay &&
                                          'bg-base-content text-base-100 rounded-full',
                                      time.today === accountDay &&
                                          'text-secondary border-secondary',
                                  ),
                        )}
                        onClick={() => {
                            time.update({
                                choiceDay: accountDay,
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

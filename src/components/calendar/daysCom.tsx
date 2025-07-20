import { useTime } from '@/store/time'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

function DaysCom(props: { month: number }) {
    const time = useTime()

    const getDoubleDay = useMemo(() => {
        return time.choiceDay === time.today ? time.today : false
    }, [time])

    const list = useMemo(() => {
        const days = dayjs(`${time.year}-${props.month}`)
        const month = Array(days.daysInMonth())
            .fill(null)
            .map((_, i) => i + 1)
        const firstDayOfMonth = days.startOf('month').day()

        return {
            firstDayOfMonth,
            month,
        }
    }, [props.month, time])

    return (
        <View className={classnames('mt-2', 'grid', 'grid-cols-7', 'gap-2')}>
            {Array(list.firstDayOfMonth)
                .fill(null)
                .map((_day, i) => (
                    <View key={i} />
                ))}
            {list.month.map((day) => {
                const accountDay = `${time.year}-${props.month}-${day}`
                return (
                    <View
                        key={day}
                        className={classnames(
                            'kbd',
                            'kbd-md',
                            'bg-base-100',
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

export default memo(DaysCom)

import dayjs from 'dayjs'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

class TimeState {
    year = 0
    month = 0
    day = 0
    choiceDay = ''
    days: number[] = []
    firstDayOfMonth: number = 0
}

export const useTime = create(
    combine(
        {
            ...new TimeState(),
        },
        (set) => {
            return {
                update(data: Partial<TimeState>) {
                    set(data)
                },
                reset() {
                    const days = dayjs()
                    const toMonth = days.month() + 1
                    const toDay = days.date()
                    set({
                        year: days.year(),
                        month: toMonth,
                        day: toDay,
                        choiceDay: `${toMonth}-${toDay}`,
                        days: Array(days.daysInMonth())
                            .fill(null)
                            .map((_, i) => i + 1),
                        firstDayOfMonth: days.startOf('month').day(),
                    })
                },
            }
        },
    ),
)

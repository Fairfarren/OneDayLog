import dayjs from 'dayjs'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

class TimeState {
    year = ''
    month = ''
    day = ''
    choiceDay = ''
    days: string[] = []
    firstDayOfMonth: number = 0
}

export const useTime = create(
    combine(
        {
            ...new TimeState(),
        },
        (set) => {
            return {
                getDoubleDay() {
                    return this.day === this.choiceDay ? this.day : false
                },
                update(data: Partial<TimeState>) {
                    set(data)
                },
                reset() {
                    const days = dayjs()
                    const toMonth = String(days.month() + 1).padStart(2, '0')
                    const toDay = `${toMonth}-${String(days.date()).padStart(2, '0')}`
                    set({
                        year: String(days.year()),
                        month: toMonth,
                        day: toDay,
                        choiceDay: toDay,
                        days: Array(days.daysInMonth())
                            .fill(null)
                            .map((_, i) => `${i + 1}`.padStart(2, '0')),
                        firstDayOfMonth: days.startOf('month').day(),
                    })
                },
            }
        },
    ),
)

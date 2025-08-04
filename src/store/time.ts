import dayjs from 'dayjs'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const _days = dayjs()

class TimeState {
    year = 0
    month = 0
    day = 0
    choiceDay = ''
    days: number[] = []
    firstDayOfMonth: number = 0
    today = `${_days.year()}-${_days.month() + 1}-${_days.date()}`
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
                reset(data?: string) {
                    const days = dayjs(data)
                    const toYear = days.year()
                    const toMonth = days.month() + 1
                    const hasDay = data?.split('-').length === 3
                    set({
                        year: toYear,
                        month: toMonth,
                        days: Array(days.daysInMonth())
                            .fill(null)
                            .map((_, i) => i + 1),
                        firstDayOfMonth: days.startOf('month').day(),
                    })
                    if (hasDay) {
                        set({
                            choiceDay: `${toYear}-${toMonth}-${days.date()}`,
                        })
                    }
                    if (!data || !this.day) {
                        const toDay = days.date()
                        set({
                            day: toDay,
                            choiceDay: `${toYear}-${toMonth}-${toDay}`,
                        })
                    }
                },
            }
        },
    ),
)

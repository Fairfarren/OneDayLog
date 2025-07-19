import dayjs from 'dayjs'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useTime = create(
    combine(
        {
            year: '',
            month: '',
            day: '',
        },
        (set) => {
            return {
                update(data) {
                    set(data)
                },
                reset() {
                    const days = dayjs()
                    set({
                        year: String(days.year()),
                        month: String(days.month()),
                        day: String(days.day()),
                    })
                },
            }
        },
    ),
)

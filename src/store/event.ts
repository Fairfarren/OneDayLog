import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export class ClassEventInfo {
    show = false
    id = 0
    unionid = ''
    title = ''
    notes = ''
    createdAt = ''
    eventTags = [] as EventTags[]
}

export const useEventInfo = create(
    combine(new ClassEventInfo(), (set) => {
        return {
            open(data?: Partial<ClassEventInfo>) {
                set({
                    ...data,
                    show: true,
                })
            },
            close() {
                set({
                    show: false,
                })
            },
            update(data: Partial<ClassEventInfo>) {
                set(data)
            },
            reset(data?: Partial<ClassEventInfo>) {
                set({
                    ...new ClassEventInfo(),
                    ...data,
                })
            },
        }
    }),
)

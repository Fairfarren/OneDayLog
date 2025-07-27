import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export class ClassEventInfo {
    show = false
    id = ''
    title = ''
    sub = ''
    tag: string[] = []
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
            reset() {
                set(new ClassEventInfo())
            },
        }
    }),
)

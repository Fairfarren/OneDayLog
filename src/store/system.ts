import { getAppBaseInfo } from '@tarojs/taro'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useSystem = create(
    combine(
        {
            ...getAppBaseInfo(),
        },
        (set) => {
            return {
                update(data) {
                    set(data)
                },
            }
        },
    ),
)

export enum WindowType {
    选择日期,
}

export const useWindowsConfig = create(
    combine(
        {
            visible: false,
            closeLoading: false,
            type: null as WindowType | null,
            props: {},
        },
        (set) => {
            return {
                open(type: WindowType, props = {}, cb?: () => void) {
                    set({
                        props,
                        type,
                        visible: true,
                    })
                    cb?.()
                },
                async close(cb?: () => Promise<unknown>) {
                    set({
                        closeLoading: true,
                    })
                    await cb?.()
                    set({
                        type: null,
                        visible: false,
                        closeLoading: false,
                        props: {},
                    })
                },
            }
        },
    ),
)

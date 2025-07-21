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

import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export class ClassUserInfo {
    'unionid': string = ''
    'openid': string = ''
    'name': string = ''
    'avatar': string = ''
    'createdAt': string = ''
}

export const useUserInfo = create(
    combine(new ClassUserInfo(), (set, get) => {
        return {
            isLogin() {
                return !!get().unionid
            },
            update(data: Partial<ClassUserInfo>) {
                set(data)
            },
            reset() {
                set(new ClassUserInfo())
            },
        }
    }),
)

/** 重新登录中 */
export const useIsReloading = create(
    combine(
        {
            value: false,
        },
        (set) => {
            return {
                update: (data: boolean) => {
                    set({ value: data })
                },
            }
        },
    ),
)

export function clearUserInfo() {
    useUserInfo.getState().reset()
    useIsReloading.getState().update(true)
}

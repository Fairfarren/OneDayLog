import Taro from '@tarojs/taro'
import { create } from 'zustand'
import { combine, createJSONStorage, persist } from 'zustand/middleware'
import { STORAGE_KEY } from '@/apis/const'
import { withStoreConfig } from '@/utils'

export class ClassUserInfo {
    avatar = ''
    bindingWx = 0
    bookNumber = 0
    deleted: 0
    experienceStatus = 1
    experienceTime = null
    gzhOpenId = null
    historyMemberLv = 1
    id = ''
    insertTime = ''
    memberLv = 1
    mobile = ''
    nickName = ''
    openId = ''
    unionId = ''
    updateTime = ''
    wechatNum = ''
    wechatRemark = null
}

export const useUserInfo = create(
    combine(new ClassUserInfo(), (set) => {
        return {
            update(data: Partial<ClassUserInfo>) {
                set(data)
            },
            reset() {
                set(new ClassUserInfo())
            },
        }
    }),
)

export const useStoToken = create(
    persist(
        combine({ value: '', code: '' }, (set) => {
            return {
                update(data) {
                    set(data)
                },
                reset() {
                    set({
                        value: '',
                        code: '',
                    })
                },
            }
        }),
        {
            name: STORAGE_KEY.TOKEN,
            storage: createJSONStorage(() => withStoreConfig),
            partialize: (state) => ({ value: state.value }),
        },
    ),
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
    useStoToken.getState().reset()
    useUserInfo.getState().reset()
    useIsReloading.getState().update(true)
}

export async function toSetCode() {
    if (!useStoToken.getState().value) {
        console.log('get token')
        try {
            const { code: newCode } = await Taro.login()
            console.log('get token => ', newCode)
            useStoToken.getState().update({ code: newCode })
        } catch (err) {
            console.log('login失败')
            console.log(err)
        }
    }
}

import { useTime } from '@/store/time'
import { type ReactNode, useEffect } from 'react'
import { useGetUserInfo } from '@/hooks/user'
import { useIsReloading } from '@/store/user'

function QueryProvider(props: { children: ReactNode }) {
    const { reloadUserInfo } = useGetUserInfo({ isReload: true })
    const isReload = useIsReloading()

    useEffect(() => {
        useTime.getState().reset()
    }, [])

    useEffect(() => {
        if (isReload.value) {
            reloadUserInfo()
        }
    }, [isReload.value])

    return props.children
}

export default QueryProvider

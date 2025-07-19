import { useTime } from '@/store/time'
import { toSetCode, useStoToken } from '@/store/user'
import { type ReactNode, useEffect } from 'react'

function QueryProvider(props: { children: ReactNode }) {
    useEffect(() => {
        let unUseStoToken = () => {}
        if (!useStoToken.persist.hasHydrated()) {
            unUseStoToken = useStoToken.persist.onFinishHydration((state) => {
                if (!state.value) {
                    toSetCode()
                }
            })
        } else {
            if (!useStoToken.getState().value) {
                toSetCode()
            }
        }

        return () => {
            unUseStoToken()
        }
    }, [])

    useEffect(() => {
        useTime.getState().reset()
    }, [])

    return props.children
}

export default QueryProvider

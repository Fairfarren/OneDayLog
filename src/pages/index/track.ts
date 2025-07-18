import { createContext, useContext } from 'react'

export function useIndex() {
    return {}
}

export const Context = createContext<unknown>(undefined)

export function useIndexContext() {
    const context = useContext(Context)
    if (!context) {
        throw new Error('没有useContext的参数')
    }
    return context as ReturnType<typeof useIndex>
}

interface PageList<T> {
    current: number
    pages: number
    records: T
    size: number
    total: number
}

interface Req<T> {
    url: string
    data: T
}

interface Action<T> {
    type: keyof T | 'reset'
    value: Partial<T> | ValueOf<T>
}

type ValueOf<T> = T[keyof T]

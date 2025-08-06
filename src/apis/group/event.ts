import API_URL from '@/apis/const'
import { post } from '@/apis/request'
import { ClassEventInfo } from '@/store/event'
import { queryOptions } from '@tanstack/react-query'

/**
 * 获取事件列表
 * @param props
 * @returns
 */
export function groupOptionsEventList(props?: {
    startTime: string
    endTime: string
    enabled?: boolean
}) {
    return queryOptions<Omit<ClassEventInfo, 'show'>[]>({
        queryKey: [API_URL.EVENT_LIST, props],
        queryFn: () => post(API_URL.EVENT_LIST, props),
        enabled: props?.enabled,
    })
}

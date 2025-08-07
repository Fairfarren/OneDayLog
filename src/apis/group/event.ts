import API_URL from '@/apis/const'
import { post } from '@/apis/request'
import { ClassEventInfo } from '@/store/event'
import { mutationOptions, queryOptions } from '@tanstack/react-query'

/**
 * 获取事件列表
 * @param props
 * @returns
 */
export function groupOptionsEventList(props?: {
    startTime?: string
    endTime?: string
    enabled?: boolean
}) {
    return queryOptions<Omit<ClassEventInfo, 'show'>[]>({
        queryKey: [API_URL.EVENT_LIST, props],
        queryFn: () => post(API_URL.EVENT_LIST, props),
        enabled: props?.enabled,
    })
}

/**
 * 添加事件
 */
export function groupOptionsEventAdd() {
    return mutationOptions({
        mutationKey: [API_URL.EVENT_ADD],
        mutationFn: (
            params: Pick<ClassEventInfo, 'title' | 'notes' | 'createdAt'> & {
                tags: string[]
            },
        ) => post(API_URL.EVENT_ADD, params),
    })
}

/**
 * 删除事件
 */
export function groupOptionsEventDelete() {
    return mutationOptions({
        mutationKey: [API_URL.EVENT_DELETE],
        mutationFn: (params: {
            eventId: ClassEventInfo['id']
            tagsId: ClassEventInfo['eventTags'][0]['tagId'][]
        }) => post(API_URL.EVENT_DELETE, params),
    })
}

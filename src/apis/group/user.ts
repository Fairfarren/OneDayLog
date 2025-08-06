import API_URL from '@/apis/const'
import { get } from '@/apis/request'
import { ClassUserInfo } from '@/store/user'
import { queryOptions } from '@tanstack/react-query'

/**
 * 获取用户信息
 * @param props
 * @param props.enabled 是否启用查询
 * @returns
 */
export function groupOptionsUser(props: { enabled?: boolean }) {
    return queryOptions({
        queryKey: [API_URL.USER_INFO],
        queryFn: () => get<ClassUserInfo>(API_URL.USER_INFO),
        enabled: props.enabled,
    })
}

import API_URL from '@/apis/const'
import {
    groupOptionsEventAdd,
    groupOptionsEventDelete,
    groupOptionsEventList,
} from '@/apis/group/event'
import { useUserInfo } from '@/store/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export function useGetEventList(
    props?: Parameters<typeof groupOptionsEventList>[0] & {
        isReload?: boolean
    },
) {
    const userInfo = useUserInfo()

    const { data, refetch, isRefetching } = useQuery(
        groupOptionsEventList({
            startTime: props?.startTime || '',
            endTime: props?.endTime || '',
            enabled: userInfo.isLogin() && !props?.isReload,
        }),
    )

    const formatList = useMemo(() => {
        const map = new Map()
        data?.forEach((item) => {
            if (map.has(item.title)) {
                map.set(item.title, [...map.get(item.title), item])
            } else {
                map.set(item.title, [item])
            }
        })
        return map.size > 0
            ? Array.from(map).map((item) => ({
                  title: item[0],
                  total: item[1].length,
                  time: dayjs(item[1][0].createdAt).format('YYYY-MM-DD'),
              }))
            : []
    }, [data])

    return {
        isLoading: isRefetching,
        list: data,
        reloadEventList: refetch,
        formatList,
    }
}

export function useDoEventAdd() {
    const { mutateAsync } = useMutation(groupOptionsEventAdd())
    const queryClient = useQueryClient()

    async function doEventAdd(props: Parameters<typeof mutateAsync>[0]) {
        await mutateAsync(props)
        return queryClient.invalidateQueries({
            queryKey: [API_URL.EVENT_LIST],
        })
    }

    return {
        doEventAdd,
    }
}

export function useDoEventDelete() {
    const { mutateAsync } = useMutation(groupOptionsEventDelete())
    const queryClient = useQueryClient()

    async function doEventDelete(props: Parameters<typeof mutateAsync>[0]) {
        await mutateAsync(props)
        return queryClient.invalidateQueries({
            queryKey: [API_URL.EVENT_LIST],
        })
    }

    return {
        doEventDelete,
    }
}

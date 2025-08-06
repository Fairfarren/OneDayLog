import { groupOptionsEventList } from '@/apis/group/event'
import { useUserInfo } from '@/store/user'
import { useQuery } from '@tanstack/react-query'

export function useGetEventList(
    props: Parameters<typeof groupOptionsEventList>[0],
) {
    const userInfo = useUserInfo()

    const { data, refetch, isRefetching } = useQuery(
        groupOptionsEventList({
            startTime: props?.startTime || '',
            endTime: props?.endTime || '',
            enabled: userInfo.isLogin(),
        }),
    )

    console.log(data)

    return {
        isLoading: isRefetching,
        list: data,
        reloadEventList: refetch,
    }
}

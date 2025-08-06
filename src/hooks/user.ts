import { useQuery } from '@tanstack/react-query'
import { groupOptionsUser } from '@/apis/group/user'
import { useUserInfo } from '@/store/user'

export function useGetUserInfo(props?: { isReload?: boolean }) {
    const { data, refetch } = useQuery(
        groupOptionsUser({
            enabled: !props?.isReload,
        }),
    )

    if (data) {
        useUserInfo.getState().update(data)
    }

    function reloadUserInfo() {
        refetch()
    }

    return {
        reloadUserInfo,
    }
}

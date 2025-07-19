import {
    DiyHeader as ADiyHeader,
    type DiyHeaderProps,
} from '@taro-react-tools/components'
import { memo } from 'react'
import PATH_URL from '@/const/path'
import { redirectTo } from '@/utils'

/**
 自定义header
 */
function DiyHeader(props: DiyHeaderProps) {
    return (
        <ADiyHeader
            {...props}
            backHome={() => {
                redirectTo(PATH_URL.INDEX)
            }}
        />
    )
}

export default memo(DiyHeader)

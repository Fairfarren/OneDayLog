import iconAddLight from '@/assets/icon/add-light.svg'
import iconAdd from '@/assets/icon/add.svg'
import { useEventInfo } from '@/store/event'
import { useSystem } from '@/store/system'
import { Image, View } from '@tarojs/components'
import classnames from 'classnames'

function AddFixed() {
    const { theme } = useSystem()

    return (
        <View
            className={classnames(
                'fixed',
                'bottom-8',
                'right-5',
                'w-12',
                'h-12',
                'bg-neutral',
                'rounded-full',
                'flex',
                'items-center',
                'justify-center',
                'shadow-lg',
            )}
            onClick={(e) => {
                e.stopPropagation()
                useEventInfo.getState().open()
            }}
        >
            <Image
                src={theme === 'dark' ? iconAdd : iconAddLight}
                className={classnames('w-6', 'h-6')}
            />
        </View>
    )
}

export default AddFixed

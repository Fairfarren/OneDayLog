import iconAddLight from '@/assets/icon/add-light.svg'
import iconAdd from '@/assets/icon/add.svg'
import PATH_URL from '@/const/path'
import { useSystem } from '@/store/system'
import { navigateTo } from '@/utils'
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
            onClick={() => navigateTo(PATH_URL.ADD_EVENT)}
        >
            <Image
                src={theme === 'dark' ? iconAdd : iconAddLight}
                className={classnames('w-6', 'h-6')}
            />
        </View>
    )
}

export default AddFixed

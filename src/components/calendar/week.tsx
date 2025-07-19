import { View } from '@tarojs/components'
import classnames from 'classnames'

const titleList = ['日', '一', '二', '三', '四', '五', '六']

function Week() {
    return (
        <View
            className={classnames(
                'mt-2',
                'grid',
                'grid-cols-7',
                'kbd',
                'kbd-md',
                'bg-base-100',
            )}
        >
            {titleList.map((item, i) => (
                <View key={i} className={classnames()}>
                    {item}
                </View>
            ))}
        </View>
    )
}

export default Week

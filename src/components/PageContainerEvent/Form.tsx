import { useEventInfo } from '@/store/event'
import { Input, View } from '@tarojs/components'
import classnames from 'classnames'

const formObj = [
    {
        key: 'title',
        label: '名称',
        placeholder: '要记录什么事情',
    },
    {
        key: 'sub',
        label: '备注',
        placeholder: '还有什么需要备注的吗',
    },
    {
        key: 'tag',
        label: '标签',
    },
]

function Form() {
    const eventInfo = useEventInfo()

    return (
        <>
            {formObj.map((item) => (
                <View
                    key={item.key}
                    className={classnames(
                        'flex',
                        'items-center',
                        'gap-2',
                        'text-lg',
                    )}
                >
                    <View className={classnames('font-medium')}>
                        {item.label}
                    </View>
                    <View>
                        {item.key === 'tag' ? (
                            <View>tag</View>
                        ) : (
                            <Input
                                value={eventInfo[item.key]}
                                onInput={(e) =>
                                    eventInfo.update({
                                        [item.key]: e.detail.value,
                                    })
                                }
                            />
                        )}
                    </View>
                </View>
            ))}
        </>
    )
}

export default Form
